import GameService from "@/lib/services/GameService";
import {Pool} from "pg";
import UserService from "@/lib/services/UserService";
import FavoriteGameService from "@/lib/services/FavoriteGameService";
import StatusService from "@/lib/services/StatusService";

export default class Registry {
    private static _instance: Registry | null = null;
    private _dbClientPool: Pool | null = null;
    private _gameService: GameService | null = null;
    private _userService: UserService | null = null;
    private _config: any | null = null;
    private _dateTimeFormatter: Intl.DateTimeFormat | null = null;
    private _favoriteGamesService: FavoriteGameService | null = null;
    private _statusService: StatusService | null = null;

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

    public get gameService() {
        if (!this._gameService) {
            this._gameService = new GameService(this.dbClientPool);
        }
        return this._gameService;
    }

    public get userService() {
        if (!this._userService) {
            this._userService = new UserService(this.dbClientPool);
        }
        return this._userService;
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

    public get favoriteGamesService() {
        if (!this._favoriteGamesService) {
            this._favoriteGamesService = new FavoriteGameService(this.dbClientPool);
        }
        return this._favoriteGamesService;
    }

    public get statusService() {
        if (!this._statusService) {
            this._statusService = new StatusService(this.dbClientPool);
        }
        return this._statusService;
    }
}
