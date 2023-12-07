export default class Game {
    private readonly _id: number | null;
    private _name: string;
    private _release: Date | null;
    private _description: string;
    private _url: string;

    constructor(
        id: number | null,
        name: string,
        release: Date | null,
        description: string,
        url: string
    ) {
        this._id = id;
        this._name = name;
        this._release = release;
        this._description = description;
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

    get release(): Date | null {
        return this._release;
    }

    set release(value: Date) {
        this._release = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get url(): string {
        return this._url;
    }

    set url(value: string) {
        this._url = value;
    }

    public values(): { id: number | null } {
        return {
            id: this.id,

        }
    }
}
