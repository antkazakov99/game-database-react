import Genre from "@/lib/entities/Genre";
import {Awaitable} from "@auth/core/types";
import AbstractService from "@/lib/services/AbstractService";

class GamesCollectionService extends AbstractService<GamesCollection> {
    /**
     * Возвращает коллекцию игр с указанным ID
     * @param id
     */
    async getById(id: number): Promise<GamesCollection | null> {
        const query = 'SELECT id, user_id, name FROM games_collections WHERE id = $1';
        return await this.findOne(query, [id]);
    }

    /**
     * Возвращает все существующие коллекции игр
     */
    async getAll(): Promise<GamesCollection[]> {
        const query = 'SELECT id, user_id, name FROM games_collections';
        return await this.findMany(query);
    }

    /**
     * Добавляет коллекцию игр
     * @param gamesCollection
     */
    async add(gamesCollection: GamesCollection): Promise<void> {
        const query = 'INSERT INTO games_collections (name) VALUES($1)';
        await this.exec(query, [gamesCollection.name]);
    }

    /**
     * Удаляет коллекцию игр
     * @param id
     */
    async delete(id: number): Promise<void> {
        const query = 'DELETE FROM games_collections WHERE id = $1';
        await this.exec(query, [id]);
    }

    /**
     * Изменяет коллекцию игр
     * @param genre
     */
    async update(genre: Genre): Promise<void> {
        // todo Add
    }

    protected createObject(fields: { id: number, user_id: number, name: string }): Awaitable<GamesCollection> {
        return new GamesCollection(fields.id, fields.user_id, fields.name);
    }
}