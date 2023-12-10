import {Awaitable} from "@auth/core/types";
import AbstractService from "@/lib/services/AbstractService";
import Publisher from "@/lib/entities/Publisher";

export class DeveloperService extends AbstractService<Publisher> {
    /**
     * Возвращает издателя с указанным ID
     * @param id
     */
    async getById(id: number): Promise<Publisher | null> {
        const query = 'SELECT id, name FROM publishers WHERE id = $1';
        return await this.findOne(query, [id]);
    }

    /**
     * Возвращает всех существующих издателей
     */
    async getAll(): Promise<Publisher[]> {
        const query = 'SELECT id, name FROM publishers';
        return await this.findMany(query);
    }

    /**
     * Добавляет издателя
     * @param publisher
     */
    async add(publisher: Publisher): Promise<void> {
        const query = 'INSERT INTO publishers (name) VALUES($1)';
        await this.exec(query, [publisher.name]);
    }

    /**
     * Удаляет издателя
     * @param id
     */
    async delete(id: number): Promise<void> {
        const query = 'DELETE FROM publishers WHERE id = $1';
        await this.exec(query, [id]);
    }

    /**
     * Изменяет издателя
     * @param developer
     */
    async update(developer: Publisher): Promise<void> {
        // todo Add
    }

    protected createObject(fields: any): Awaitable<Publisher> {
        return new Publisher(fields.id, fields.name);
    }
}
