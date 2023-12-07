import AbstractClient from "@/lib/db/AbstractClient";

export default class UserClient extends AbstractClient<User> {
    async getById(id: number): Promise<User | null> {
        const query: string = 'SELECT users.id, users.email, users.password, users.username,users.is_admin FROM users WHERE users.id = $1';
        return this.findOne(query, [id]);
    }

    async getAll(): Promise<User[]> {
        const query: string = 'SELECT users.id, users.email, users.password, users.username, users.is_admin FROM users';
        return this.findMany(query);
    }

    async getByEmail(email: string): Promise<User | null> {
        const query: string = 'SELECT users.id, users.email, users.password, users.username, users.is_admin FROM users WHERE users.email = $1';
        return this.findOne(query, [email]);
    }

    async getByUsername(username: string): Promise<User | null> {
        const query: string = 'SELECT users.id, users.email, users.password, users.username, users.is_admin FROM users WHERE users.username = $1';
        return this.findOne(query, [username]);
    }

    protected createObject(fields: {
        id: number,
        email: string,
        username: string,
        password: string,
        is_admin: boolean
    }): User {
        return new User(fields.id, fields.email, fields.password, fields.username, fields.is_admin);
    }
}
