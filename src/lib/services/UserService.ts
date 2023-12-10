import AbstractService from "@/lib/services/AbstractService";
import User from "@/lib/entities/User";

export default class UserReviewService extends AbstractService<User> {
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

    async add(user: User): Promise<void> {
        const query: string = 'INSERT INTO users (username, email, password, is_admin) VALUES($1, $2, $3, $4)';
        await this.exec(query, [user.username, user.email, user.password, user.isAdmin]);
    }

    async delete(id: number): Promise<void> {
        const query = 'DELETE FROM users WHERE id = $1';
        await this.exec(query, [id]);
    }

    protected createObject(fields: {
        id: number,
        email: string,
        username: string,
        password: string,
        is_admin: boolean
    }): User {
        return new User(fields.id, fields.username, fields.email, fields.password, fields.is_admin);
    }
}
