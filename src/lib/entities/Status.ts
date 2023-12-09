export default class Status {
    private readonly _id: number | null;
    private  _name: string;

    constructor(id: number | null, name: string) {
        this._id = id;
        this._name = name;
    }

    public get id(): number | null {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }
}
