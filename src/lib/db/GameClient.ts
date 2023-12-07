import {Pool} from "pg";
import Game from "@/lib/entries/Game";
import AbstractClient from "@/lib/db/AbstractClient";

export default class GameClient extends AbstractClient {
    constructor(clientPool: Pool) {
        super(clientPool);
    }

    async add(game: Game): Promise<void> {
        // const query = 'INSERT INTO games(name, release, description, url) VALUES($1, $2, $3, $4)';
        //
        // await this.client.connect();
        //
        // try {
        //     await this.client.query('BEGIN');
        //     const result = await this.client.query(query, [
        //         game.name,
        //         game.release,
        //         game.description,
        //         game.url
        //     ]);
        //     // todo Add other data addition
        //     await this.client.query('COMMIT');
        // } catch (e) {
        //     await this.client.query('ROLLBACK');
        //     throw e;
        // } finally {
        //     await this.client.end();
        // }
    }

    delete(id: number): void {
        // todo Add game delete
    }

    getByFilter(filter: AbstractFilter<Game>, {page, size}: { page: number, size: number }): Game[] {
        // todo Add select by filter
        return [];
    }

    async getAll({page, size}: { page: number | null, size: number | null } = {
        page: null,
        size: null
    }): Promise<Game[]> {
        const limit = size != null ? size : 'ALL';
        const offset = size != null && page != null ? size * (page - 1) : 0;
        const query = `SELECT games.id, games.name, games.release, games.description, games.url FROM games LIMIT ${limit} OFFSET ${offset}`;

        const client = await this.clientPool.connect();
        const result = await client.query(query);
        client.release();

        return result.rows.map((value: {
            id: string,
            name: string,
            release: string,
            description: string,
            url: string
        }) => {
            return new Game(parseInt(value['id']), value['name'], new Date(value['release']), value['description'], value['url']);
        });
    }

    async getById(id: number): Promise<Game | null> {
        const query = 'SELECT games.id, games.name, games.release, games.description, games.url FROM games WHERE games.id = $1';
        const client = await this.clientPool.connect();
        const result = await client.query(query, [id]);
        client.release();

        if (!result.rowCount) {
            return null;
        }

        const game: { id: string, name: string, release: string, description: string, url: string } = result.rows[0];
        return new Game(parseInt(game.id), game.name, new Date(game.release), game.description, game.url);
    }

    update(game: Game): void {
        // todo Add game update
    }
}