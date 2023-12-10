import AbstractService from "@/lib/services/AbstractService";
import Game from "@/lib/entities/Game";
import Registry from "@/lib/Registry";
import {Awaitable} from '@auth/core/types';
import {Pool} from "pg";

export default class GameService extends AbstractService<Game> {
    constructor(clientPool: Pool) {
        super(clientPool);
    }

    /**
     * Добавляет игру
     * @param game
     */
    async add(game: Game): Promise<void> {
        const query = 'INSERT INTO games (name, release, description, url) VALUES ($1, $2, $3, $4)';
        await this.exec(query, [game.name, game.release, game.description, game.url]);
    }

    /**
     * Удаляет игру
     * @param id
     */
    async delete(id: number): Promise<void> {
        const query = 'DELETE FROM games WHERE id = $1';
        await this.exec(query, [id]);
    }

    /**
     * Возващает все добавленные игры
     */
    async getAll(): Promise<Game[]> {
        const query = 'SELECT games.id, games.name, games.release, games.description, games.url FROM games';
        return this.findMany(query);
    }

    /**
     * Возвращает игру с указанным ID
     * @param id
     */
    async getById(id: number): Promise<Game | null> {
        const query = 'SELECT id, name, release, description, url FROM games WHERE id = $1';
        return this.findOne(query, [id]);
    }

    /**
     * Изменяет данные об игре
     * @param game
     */
    async update(game: Game): Promise<void> {
        // todo Add
    }

    protected createObject(fields: {
        id: number,
        name: string,
        release: string | null,
        description: string,
        url: string
    }): Awaitable<Game> {
        const game = new Game(
            fields.id,
            fields.name,
            fields.release !== null ? new Date(fields.release) : fields.release,
            fields.description,
            fields.url
        );

        return (async () => {
            const registry = Registry.instance;
            game.developers = await registry.developerService.getByGameId(fields.id);
            game.publishers = await registry.publisherService.getByGameId(fields.id);
            game.genres = await registry.genreService.getByGameId(fields.id);
            return game;
        })();
    }
}
