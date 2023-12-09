import AbstractClient from "@/lib/db/AbstractClient";

export default class StatusClient extends AbstractClient<Status> {
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
     * @param statusId
     */
    async delete(statusId: number): Promise<void> {
        const query = 'DELETE FROM statuses WHERE statuses.id = $1';
        await this.exec(query, [statusId]);
    }

    /**
     * Возвращает статус с указанным ID
     * @param statusId
     */
    async getById(statusId: number): Promise<Status | null> {
        const query = 'SELECT id, name FROM statuses WHERE id = $1';
        return await this.findOne(query, [statusId]);
    }

    /**
     * Возвращает все статусы
     */
    async getAll(): Promise<Status[]> {
        const query = 'SELECT id, name FROM statuses';
        return await this.findMany(query);
    }

    protected createObject(fields: { id: number, name: string }): Status {
        return new Status(fields.id, fields.name);
    }
}
