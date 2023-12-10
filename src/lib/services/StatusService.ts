import AbstractService from "@/lib/services/AbstractService";
import Status from "@/lib/entities/Status";
import Publisher from "@/lib/entities/Publisher";

export default class StatusService extends AbstractService<Status> {
    /**
     * Возвращает статус с указанным ID
     * @param id
     */
    async getById(id: number): Promise<Status | null> {
        const query = 'SELECT id, name FROM statuses WHERE id = $1';
        return await this.findOne(query, [id]);
    }

    /**
     * Возвращает все статусы
     */
    async getAll(): Promise<Status[]> {
        const query = 'SELECT id, name FROM statuses';
        return await this.findMany(query);
    }

    /**
     * Добавляет статус
     * @param status
     */
    async add(status: Status): Promise<void> {
        const query = 'INSERT INTO statuses (name) VALUES ($1)';
        await this.exec(query, [status.name]);
    }

    /**
     * Удаляет статус
     * @param id
     */
    async delete(id: number): Promise<void> {
        const query = 'DELETE FROM statuses WHERE statuses.id = $1';
        await this.exec(query, [id]);
    }

    /**
     * Изменяет статус
     * @param status
     */
    async update(status: Status): Promise<void> {
        // todo Add
    }

    protected createObject(fields: { id: number, name: string }): Status {
        return new Status(fields.id, fields.name);
    }
}
