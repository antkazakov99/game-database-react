class GamesCollection {
    private readonly _id: number | null;
    private readonly _userId: number;
    private _name: string;

    constructor(id: number | null, userId: number, name: string) {
        this._id = id;
        this._userId = userId;
        this._name = name;
    }

    get id(): number | null {
        return this._id;
    }

    get userId(): number {
        return this._userId;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
}