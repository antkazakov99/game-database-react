import {Awaitable} from "@auth/core/types";
import AbstractService from "@/lib/services/AbstractService";
import Critic from "@/lib/entities/Critic";

export default class CriticService extends AbstractService<Critic> {
    /**
     * Возвращает критика с указанным ID
     * @param id
     */
    async getById(id: number): Promise<Critic | null> {
        const query = 'SELECT id, name FROM critics WHERE id = $1';
        return await this.findOne(query, [id]);
    }

    /**
     * Возвращает всех существующих критиков
     */
    async getAll(): Promise<Critic[]> {
        const query = 'SELECT id, name, url FROM critics';
        return await this.findMany(query);
    }

    /**
     * Добавляет критика
     * @param critic
     */
    async add(critic: Critic): Promise<void> {
        const query = 'INSERT INTO critics (name, url) VALUES($1, $2)';
        await this.exec(query, [critic.name, critic.url]);
    }

    /**
     * Удаляет критика
     * @param id
     */
    async delete(id: number): Promise<void> {
        const query = 'DELETE FROM critics WHERE id = $1';
        await this.exec(query, [id]);
    }

    /**
     * Изменяет критика
     * @param critic
     */
    async update(critic: Critic): Promise<void> {
        // todo Add
    }

    protected createObject(fields: any): Awaitable<Critic> {
        return new Critic(fields.id, fields.name, fields.url);
    }
}
