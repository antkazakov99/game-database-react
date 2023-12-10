import {Awaitable} from "@auth/core/types";
import Developer from "@/lib/entities/Developer";
import AbstractService from "@/lib/services/AbstractService";

export default class DeveloperService extends AbstractService<Developer> {

    /**
     * Возвращает разработчика с указанным ID
     * @param id
     */
    async getById(id: number): Promise<Developer | null> {
        const query = 'SELECT id, name FROM developers WHERE id = $1';
        return await this.findOne(query, [id]);
    }

    /**
     * Возвращает всех существующих разработчиков
     */
    async getAll(): Promise<Developer[]> {
        const query = 'SELECT id, name FROM developers';
        return await this.findMany(query);
    }

    async getByGameId(gameId: number): Promise<Developer[]> {
        const query = 'SELECT developers.id, developers.name FROM developers INNER JOIN games_developers ON developers.id = games_developers.developer_id WHERE games_developers.game_id = $1';
        return await this.findMany(query, [gameId]);
    }

    /**
     * Добавляет разработчика
     * @param developer
     */
    async add(developer: Developer): Promise<void> {
        const query = 'INSERT INTO developers (name) VALUES($1)';
        await this.exec(query, [developer.name]);
    }

    /**
     * Удаляет разработчика
     * @param id
     */
    async delete(id: number): Promise<void> {
        const query = 'DELETE FROM developers WHERE id = $1';
        await this.exec(query, [id]);
    }

    /**
     * Изменяет разработчика
     * @param developer
     */
    async update(developer: Developer): Promise<void> {
        // todo Add
    }

    protected createObject(fields: any): Awaitable<Developer> {
        return new Developer(fields.id, fields.name);
    }
}
