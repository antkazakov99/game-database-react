import AbstractService from "@/lib/services/AbstractService";
import Game from "@/lib/entities/Game";
import Registry from "@/lib/Registry";
import {Awaitable} from '@auth/core/types';
import {Pool} from "pg";
import Developer from '@/lib/entities/Developer';
import Publisher from '@/lib/entities/Publisher';
import Genre from '@/lib/entities/Genre';
import * as punycode from 'punycode';

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
        const rows: { id: number }[] = await this.exec(query, [game.name, game.release, game.description, game.url, game.verticalCoverName, game.horizontalCoverName]);
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

    async getByIdRaw(id: number) {
        const query = 'SELECT id, name, release, description, url, vertical_cover, horizontal_cover FROM games WHERE id = $1';
        const game = (await this.exec(query, [id]))[0];
        game.developers = (await this.getDevelopersListRaw(id)).map((value) => value.developer_id);
        game.publishers = (await this.getPublishersListRaw(id)).map((value) => value.publisher_id);
        game.genres = (await this.getGenresListRaw(id)).map((value) => value.genre_id);
        return game;
    }

    async getDevelopersListRaw(id: number) {
        const query = 'SELECT developer_id FROM games_developers WHERE game_id = $1';
        return (await this.exec(query, [id]));
    }

    async getGenresListRaw(id: number) {
        const query = 'SELECT genre_id FROM games_genres WHERE game_id = $1';
        return (await this.exec(query, [id]));
    }

    async getPublishersListRaw(id: number) {
        const query = 'SELECT publisher_id FROM games_publishers WHERE game_id = $1';
        return (await this.exec(query, [id]));
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

    async updateGenresList(gameId: number, genres: Genre[]): Promise<void> {
        const deleteQuery = 'DELETE FROM games_genres WHERE game_id = $1';
        const insertQuery = 'INSERT INTO games_genres(game_id, developer_id) VALUES($1, $2)';
        let insertQueries: [string, any[]][] = [];
        genres.forEach((value) => {
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

    async updateDevelopersListRaw(gameId: number, developers: any): Promise<void> {
        const deleteQuery = 'DELETE FROM games_developers WHERE game_id = $1';
        const insertQuery = 'INSERT INTO games_developers(game_id, developer_id) VALUES($1, $2)';
        let insertQueries: [string, any[]][] = [];
        if (developers instanceof Array) {
            developers.forEach((value) => {
                insertQueries.push([insertQuery, [gameId, value]]);
            });
        }

        await this.execMany([[deleteQuery, [gameId]], ...insertQueries]);
    }

    async updateGenresListRaw(gameId: number, genres: any): Promise<void> {
        const deleteQuery = 'DELETE FROM games_genres WHERE game_id = $1';
        const insertQuery = 'INSERT INTO games_genres(game_id, genre_id) VALUES($1, $2)';
        let insertQueries: [string, any[]][] = [];
        if (genres instanceof Array) {
            genres.forEach((value) => {
                insertQueries.push([insertQuery, [gameId, value]]);
            });
        }

        await this.execMany([[deleteQuery, [gameId]], ...insertQueries]);
    }

    async updatePublishersListRaw(gameId: number, publishers: any): Promise<void> {
        const deleteQuery = 'DELETE FROM games_publishers WHERE game_id = $1';
        const insertQuery = 'INSERT INTO games_publishers(game_id, publisher_id) VALUES($1, $2)';
        let insertQueries: [string, any[]][] = [];
        if (publishers instanceof Array) {
            publishers.forEach((value) => {
                insertQueries.push([insertQuery, [gameId, value]]);
            });
        }

        await this.execMany([[deleteQuery, [gameId]], ...insertQueries]);
    }

    /**
     * Изменяет данные об игре
     * @param game
     */
    async updateRaw(game: any): Promise<void> {
        const query = 'UPDATE games SET (name, release, description, url, vertical_cover, horizontal_cover) = ($2, $3, $4, $5, $6, $7) WHERE games.id = $1';
        await Promise.all([
            this.exec(query, [game.id, game.name, game.release, game.description, game.url, game.vertical_cover, game.horizontal_cover]),
            this.updateDevelopersListRaw(game.id, game.developers),
            this.updatePublishersListRaw(game.id, game.publishers),
            this.updateGenresListRaw(game.id, game.genres),
        ]);
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
