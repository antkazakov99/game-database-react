import {Pool, QueryResult} from "pg";
import {Awaitable} from "@auth/core/types";
import AbstractEntity from "@/lib/entities/AbstractEntity";

export default abstract class AbstractService<Type extends AbstractEntity> {
    private clientPool: Pool;

    constructor(clientPool: Pool) {
        this.clientPool = clientPool
    }

    protected abstract createObject(fields: any): Awaitable<Type>;

    protected async exec(query: string, params: any[] = []): Promise<any[]> {
        const client = await this.clientPool.connect();
        const queryResult: QueryResult = await client.query(query, params);
        client.release();
        return queryResult.rows;
    }

    protected async execMany(queriesData: [string, any[]][]): Promise<void> {
        const client = await this.clientPool.connect();
        try {
            await client.query('BEGIN');
            await Promise.all(queriesData.map((queryData) => client.query(queryData[0], queryData[1])));
            await client.query('COMMIT');
        } catch (e) {
            await client.query('ROLLBACK');
        } finally {
            client.release();
        }
    }

    protected async findMany(query: string, params: any[] = []): Promise<Type[]> {
        const client = await this.clientPool.connect();
        const result = await client.query(query, params);
        client.release();

        return await Promise.all(result.rows.map((value) => this.createObject(value)));
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
}
