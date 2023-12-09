import GameClient from "@/lib/db/GameClient";
import {Pool} from "pg";
import UserClient from "@/lib/db/UserClient";
import FavoriteGamesClient from "@/lib/db/FavoriteGamesClient";
import StatusClient from "@/lib/db/StatusClient";

export default class Registry {
    private static _instance: Registry | null = null;
    private _dbClientPool: Pool | null = null;
    private _gameClient: GameClient | null = null;
    private _userClient: UserClient | null = null;
    private _config: any | null = null;
    private _dateTimeFormatter: Intl.DateTimeFormat | null = null;
    private _favoriteGamesClient: FavoriteGamesClient | null = null;
    private _statusClient: StatusClient | null = null;

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

    public get userClient() {
        if (!this._userClient) {
            this._userClient = new UserClient(this.dbClientPool);
        }
        return this._userClient;
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

    public get favoriteGamesClient() {
        if (!this._favoriteGamesClient) {
            this._favoriteGamesClient = new FavoriteGamesClient(this.dbClientPool);
        }
        return this._favoriteGamesClient;
    }

    public get statusClient() {
        if (!this._statusClient) {
            this._statusClient = new StatusClient(this.dbClientPool);
        }
        return this._statusClient;
    }
}
