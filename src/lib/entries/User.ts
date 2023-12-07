class User {
    private readonly _id: number | null;
    private _email: string;
    private _username: string | null;
    private _password: string;
    private _isAdmin: boolean;

    constructor(id: number, email: string, password: string, username: string | null = null, isAdmin: boolean = false) {
        this._id = id;
        this._email = email;
        this._username = username;
        this._password = password;
        this._isAdmin = false;
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

    get username(): string | null {
        return this._username;
    }

    set username(value: string | null) {
        this._username = value;
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