import {Pool} from "pg";
import Game from "@/lib/entries/Game";
import AbstractClient from "@/lib/db/AbstractClient";

export default class GameClient extends AbstractClient<Game> {
    constructor(clientPool: Pool) {
        super(clientPool);
    }

    async getAll({page, size}: { page: number | null, size: number | null } = {
        page: null,
        size: null
    }): Promise<Game[]> {
        const limit = size != null ? size : 'ALL';
        const offset = size != null && page != null ? size * (page - 1) : 0;
        const query = `SELECT games.id, games.name, games.release, games.description, games.url FROM games LIMIT ${limit} OFFSET ${offset}`;

        return this.findMany(query);
    }

    async getById(id: number): Promise<Game | null> {
        const query = 'SELECT games.id, games.name, games.release, games.description, games.url FROM games WHERE games.id = $1';
        return this.findOne(query);
    }

    protected createObject(fields: {
        id: number,
        name: string,
        release: string | null,
        description: string,
        url: string
    }): Game {
        return new Game(
            fields.id,
            fields.name,
            fields.release !== null ? new Date(fields.release) : fields.release,
            fields.description,
            fields.url
        );
    }
}