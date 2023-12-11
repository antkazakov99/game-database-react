import CriticReviewService from "@/lib/services/CriticReviewService";
import CriticService from "@/lib/services/CriticService";
import DeveloperService from "@/lib/services/DeveloperService";
import FavoriteGameService from "@/lib/services/FavoriteGameService";
import GameService from "@/lib/services/GameService";
import GamesCollectionService from '@/lib/services/GamesCollectionService';
import GenreService from "@/lib/services/GenreService";
import PublisherService from "@/lib/services/PublisherService";
import StatusService from "@/lib/services/StatusService";
import UserReviewService from "@/lib/services/UserReviewService";
import UserService from "@/lib/services/UserService";
import {Pool} from "pg";

export default class Registry {
    private static _instance: Registry | null = null;
    private _config: any | null = null;
    private _criticReviewService: CriticReviewService | null = null;
    private _criticService: CriticService | null = null;
    private _dateTimeFormatter: Intl.DateTimeFormat | null = null;
    private _dbClientPool: Pool | null = null;
    private _developerService: DeveloperService | null = null;
    private _favoriteGamesService: FavoriteGameService | null = null;
    private _gameService: GameService | null = null;
    private _gamesCollectionService: GamesCollectionService | null = null;
    private _genreService: GenreService | null = null;
    private _publisherService: PublisherService | null = null;
    private _statusService: StatusService | null = null;
    private _userReviewService: UserReviewService | null = null;
    private _userService: UserService | null = null;

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

    get criticReviewService(): CriticReviewService {
        if (!this._criticReviewService) {
            this._criticReviewService = new CriticReviewService(this.dbClientPool);
        }
        return this._criticReviewService;
    }

    get criticService(): CriticService {
        if (!this._criticService) {
            this._criticService = new CriticService(this.dbClientPool);
        }
        return this._criticService;
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

    public get dbClientPool() {
        if (!this._dbClientPool) {
            this._dbClientPool = new Pool(
                Registry.instance.config.db
            );
        }
        return this._dbClientPool;
    }

    get developerService(): DeveloperService {
        if (!this._developerService) {
            this._developerService = new DeveloperService(this.dbClientPool);
        }
        return this._developerService;
    }

    public get favoriteGamesService() {
        if (!this._favoriteGamesService) {
            this._favoriteGamesService = new FavoriteGameService(this.dbClientPool);
        }
        return this._favoriteGamesService;
    }

    public get gameService() {
        if (!this._gameService) {
            this._gameService = new GameService(this.dbClientPool);
        }
        return this._gameService;
    }

    get gamesCollectionService(): GamesCollectionService | null {
        if (this._gamesCollectionService) {
            this._gamesCollectionService = new GamesCollectionService(this.dbClientPool);
        }
        return this._gamesCollectionService;
    }

    get genreService(): GenreService {
        if (!this._genreService) {
            this._genreService = new GenreService(this.dbClientPool);
        }
        return this._genreService;
    }

    get publisherService(): PublisherService {
        if (!this._publisherService) {
            this._publisherService = new PublisherService(this.dbClientPool);
        }
        return this._publisherService;
    }

    public get statusService() {
        if (!this._statusService) {
            this._statusService = new StatusService(this.dbClientPool);
        }
        return this._statusService;
    }

    get userReviewService(): UserReviewService {
        if (!this._userReviewService) {
            this._userReviewService = new UserReviewService(this.dbClientPool);
        }
        return this._userReviewService;
    }

    public get userService() {
        if (!this._userService) {
            this._userService = new UserService(this.dbClientPool);
        }
        return this._userService;
    }
}
