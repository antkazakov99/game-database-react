export default class UserReview {
    private readonly _userId: number;
    private readonly _gameId: number;
    private _summary: string | null;
    private _rating: number | null;

    constructor(userId: number, gameId: number, summary: string | null, rating: number | null) {
        this._userId = userId;
        this._gameId = gameId;
        this._summary = summary;
        this._rating = rating;
    }

    get userId(): number | null {
        return this._userId;
    }

    get gameId(): number | null {
        return this._gameId;
    }

    get summary(): string | null {
        return this._summary;
    }

    set summary(value: string | null) {
        this._summary = value;
    }

    get rating(): number | null {
        return this._rating;
    }

    set rating(value: number | null) {
        this._rating = value;
    }
}