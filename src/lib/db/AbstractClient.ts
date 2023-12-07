import {Pool} from "pg";

export default abstract class AbstractClient
{
    protected clientPool: Pool;

    constructor(clientPool: Pool) {
        this.clientPool = clientPool
    }
}
