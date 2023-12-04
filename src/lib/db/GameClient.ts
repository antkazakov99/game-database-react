import {Client, Pool} from "pg";
import Game from "@/lib/entries/Game";

export default class GameClient {
    private clientPool: Pool;

    constructor(clientPool: Pool) {
        this.clientPool = clientPool
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

    getByFilter(filter: AbstractFilter<Game>): Game[] {
        // todo Add select by filter
        return [];
    }

    async getById(id: number): Promise<Game | null> {
        const query = 'SELECT games.id, games.name, games.release, games.description, games.url FROM games WHERE games.id = $1';
        const client = await this.clientPool.connect();
        const result = await client.query(query, [id]);
        client.release();

        if (!result.rowCount) {
            return null;
        }

        const game = result.rows[0];
        return new Game(game['id'], game['name'], game['release'], game['description'], game['url']);
    }

    update(game: Game): void {
        // todo Add game update
    }
}