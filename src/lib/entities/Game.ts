import Developer from "@/lib/entities/Developer";
import Publisher from '@/lib/entities/Publisher';
import Genre from '@/lib/entities/Genre';

export default class Game {
    private _description: string;
    private _developers: Developer[] = [];
    private _genres: Genre[] = [];
    private readonly _id: number | null;
    private _name: string;
    private _publishers: Publisher[] = [];
    private _release: Date | null;
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

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get developers(): Developer[] {
        return this._developers;
    }

    set developers(developers: Developer[]) {
        this._developers = developers;
    }

    public get genres(): Genre[] {
        return this._genres;
    }

    public set genres(value: Genre[]) {
        this._genres = value;
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

    public get publishers(): Publisher[] {
        return this._publishers;
    }

    public set publishers(value: Publisher[]) {
        this._publishers = value;
    }

    get release(): Date | null {
        return this._release;
    }

    set release(value: Date) {
        this._release = value;
    }

    get url(): string {
        return this._url;
    }

    set url(value: string) {
        this._url = value;
    }
}
