export default class User {
    private readonly _id: number | null;
    private _email: string;
    private _username: string | null;
    private _password: string;
    private _isAdmin: boolean;

    constructor(id: number | null, username: string | null = null, email: string, password: string, isAdmin: boolean = false) {
        this._id = id;
        this._username = username;
        this._email = email;
        this._password = password;
        this._isAdmin = isAdmin;
    }

    get username(): string | null {
        return this._username;
    }

    set username(value: string | null) {
        this._username = value;
    }

    public get id() {
        return this._id
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get isAdmin(): boolean {
        return this._isAdmin;
    }

    set isAdmin(value: boolean) {
        this._isAdmin = value;
    }
}