import {Pool} from "pg";
import {Awaitable} from "@auth/core/types";

export default abstract class AbstractService<Type> {
    private clientPool: Pool;

    constructor(clientPool: Pool) {
        this.clientPool = clientPool
    }

    protected async findOne(query: string, params: any[] = []): Promise<Type | null> {
        const client = await this.clientPool.connect();
        const result = await client.query(query, params);
        client.release();

        if (result.rowCount === 0) {
            return null;
        }

        return this.createObject(result.rows[0]);
    }

    protected async findMany(query: string, params: any[] = []): Promise<Type[]> {
        const client = await this.clientPool.connect();
        const result = await client.query(query, params);
        client.release();

        return await Promise.all(result.rows.map((value) => this.createObject(value)));
    }

    protected async exec(query: string, params: any[] = []): Promise<void> {
        const client = await this.clientPool.connect();
        await client.query(query, params);
        client.release();
    }

    protected abstract createObject(fields: any): Awaitable<Type>;
}
