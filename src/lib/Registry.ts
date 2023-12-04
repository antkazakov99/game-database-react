import GameClient from "@/lib/db/GameClient";
import {Pool} from "pg";

export default class Registry {
    private static _instance: Registry | null = null;
    private _dbClientPool: Pool | null = null;
    private _gameClient: GameClient | null = null;
    private _config: any | null = null;
    private _dateTimeFormatter: Intl.DateTimeFormat | null = null;

    private constructor() {
    }

    public static get instance() {
        if (this._instance == null) {
            this._instance = new Registry();
        }
        return this._instance;
    }

    public get config() {
        if (!this._config) {
            this._config = require('@/config.json');
        }
        return this._config;
    }

    public get dbClientPool() {
        if (!this._dbClientPool) {
            this._dbClientPool = new Pool(
                Registry.instance.config.db
            );
        }
        return this._dbClientPool;
    }

    public get gameClient() {
        if (!this._gameClient) {
            this._gameClient = new GameClient(this.dbClientPool);
        }
        return this._gameClient;
    }

    public get dateTimeFormatter() {
        if (!this._dateTimeFormatter) {
            this._dateTimeFormatter = new Intl.DateTimeFormat(
                "ru",
                {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                }
            )
        }
        return this._dateTimeFormatter;
    }
}