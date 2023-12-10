export default class CriticReview {
    private readonly _gameId: number;
    private readonly _criticId: number;
    private _summary: string;
    private _url: string;
    private _rating: number | null;

    constructor(gameId: number, criticId: number, summary: string, url: string, rating: number | null) {
        this._gameId = gameId;
        this._criticId = criticId;
        this._summary = summary;
        this._url = url;
        this._rating = rating;
    }

    get gameId(): number | null {
        return this._gameId;
    }

    get criticId(): number | null {
        return this._criticId;
    }

    get summary(): string {
        return this._summary;
    }

    set summary(value: string) {
        this._summary = value;
    }

    get url(): string {
        return this._url;
    }

    set url(value: string) {
        this._url = value;
    }

    get rating(): number | null {
        return this._rating;
    }

    set rating(value: number | null) {
        this._rating = value;
    }
}