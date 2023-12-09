import Status from "@/lib/entities/Status";

export default class FavoriteGame {
    private readonly _userId: number;
    private readonly _gameId: number;
    private _status: Status | null;

    constructor(userId: number, gameId: number, status: Status | null = null) {
        this._userId = userId;
        this._gameId = gameId;
        this._status = status;
    }

    public get userId() {
        return this._userId;
    }

    public get gameId() {
        return this._gameId;
    }

    public get status(): Status | null {
        return this._status;
    }

    public set status(status: Status | null) {
        this._status = status;
    }
}