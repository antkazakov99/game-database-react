import AbstractService from "@/lib/services/AbstractService";
import Game from "@/lib/entities/Game";
import Registry from "@/lib/Registry";
import {Awaitable} from '@auth/core/types';
import {Pool} from "pg";
import Developer from '@/lib/entities/Developer';
import Publisher from '@/lib/entities/Publisher';
import Genre from '@/lib/entities/Genre';

export default class GameService extends AbstractService<Game> {
    constructor(clientPool: Pool) {
        super(clientPool);
    }

    /**
     * Добавляет игру
     * @param game
     */
    async add(game: Game): Promise<void> {
        const query = 'INSERT INTO games (name, release, description, url, vertical_cover, horizontal_cover) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';
        const rows: {id: number}[] = await this.exec(query, [game.name, game.release, game.description, game.url, game.verticalCoverName, game.horizontalCoverName]);
        const id: number = rows[0].id;
        if (id) {
            await this.updateDevelopersList(id, game.developers);
            await this.updatePublishersList(id, game.publishers);
            await this.updateGenresList(id, game.genres);
        }
    }

    /**
     * Удаляет игру
     * @param id
     */
    async delete(id: number): Promise<void> {
        const query = 'DELETE FROM games WHERE id = $1';
        await this.exec(query, [id]);
        await this.updateDevelopersList(id, []);
        await this.updatePublishersList(id, []);
        await this.updateGenresList(id, []);
    }

    /**
     * Возващает все добавленные игры
     */
    async getAll(): Promise<Game[]> {
        const query = 'SELECT id, name, release, description, url, vertical_cover, horizontal_cover FROM games';
        return this.findMany(query);
    }

    /**
     * Возвращает игру с указанным ID
     * @param id
     */
    async getById(id: number): Promise<Game | null> {
        const query = 'SELECT id, name, release, description, url, vertical_cover, horizontal_cover FROM games WHERE id = $1';
        return this.findOne(query, [id]);
    }

    /**
     * Изменяет данные об игре
     * @param game
     */
    async update(game: Game): Promise<void> {
        // todo Add
    }

    async updateDevelopersList(gameId: number, developers: Developer[]): Promise<void> {
        const deleteQuery = 'DELETE FROM games_developers WHERE game_id = $1';
        const insertQuery = 'INSERT INTO games_developers(game_id, developer_id) VALUES($1, $2)';
        let insertQueries: [string, any[]][] = [];
        developers.forEach((value) => {
            insertQueries.push([insertQuery, [gameId, value.id]]);
        });

        await this.execMany([[deleteQuery, [gameId]], ...insertQueries]);
    }

    async updatePublishersList(gameId: number, publishers: Publisher[]): Promise<void> {
        const deleteQuery = 'DELETE FROM games_publishers WHERE game_id = $1';
        const insertQuery = 'INSERT INTO games_publishers(game_id, developer_id) VALUES($1, $2)';
        let insertQueries: [string, any[]][] = [];
        publishers.forEach((value) => {
            insertQueries.push([insertQuery, [gameId, value.id]]);
        });

        await this.execMany([[deleteQuery, [gameId]], ...insertQueries]);
    }

    async updateGenresList(gameId: number, genres: Genre[]): Promise<void> {
        const deleteQuery = 'DELETE FROM games_genres WHERE game_id = $1';
        const insertQuery = 'INSERT INTO games_genres(game_id, developer_id) VALUES($1, $2)';
        let insertQueries: [string, any[]][] = [];
        genres.forEach((value) => {
            insertQueries.push([insertQuery, [gameId, value.id]]);
        });

        await this.execMany([[deleteQuery, [gameId]], ...insertQueries]);
    }

    protected createObject(fields: {
        id: number,
        name: string,
        release: string | null,
        description: string,
        url: string,
        vertical_cover: string,
        horizontal_cover: string
    }): Awaitable<Game> {
        const game = new Game(
            fields.id,
            fields.name,
            fields.release !== null ? new Date(fields.release) : fields.release,
            fields.description,
            fields.url
        );

        game.verticalCoverName = fields.vertical_cover;
        game.horizontalCoverName = fields.horizontal_cover;

        return (async () => {
            const registry = Registry.instance;
            game.developers = await registry.developerService.getByGameId(fields.id);
            game.publishers = await registry.publisherService.getByGameId(fields.id);
            game.genres = await registry.genreService.getByGameId(fields.id);
            return game;
        })();
    }
}
