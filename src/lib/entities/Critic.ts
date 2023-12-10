export default class Critic {
    private readonly _id: number | null;
    private _name: string;
    private _url: string;

    constructor(id: number | null, name: string, url: string) {
        this._id = id;
        this._name = name;
        this._url = url;
    }

    get id(): number | null {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get url(): string {
        return this._url;
    }

    set url(value: string) {
        this._url = value;
    }
}
