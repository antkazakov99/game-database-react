import Publisher from "@/lib/entities/Publisher";
import {Awaitable} from "@auth/core/types";
import AbstractService from "@/lib/services/AbstractService";
import Genre from "@/lib/entities/Genre";

class GenreService extends AbstractService<Genre> {
    /**
     * Возвращает жанр с указанным ID
     * @param id
     */
    async getById(id: number): Promise<Genre | null> {
        const query = 'SELECT id, name FROM genres WHERE id = $1';
        return await this.findOne(query, [id]);
    }

    /**
     * Возвращает все существующие жанры
     */
    async getAll(): Promise<Genre[]> {
        const query = 'SELECT id, name FROM genres';
        return await this.findMany(query);
    }

    /**
     * Добавляет жанр
     * @param genre
     */
    async add(genre: Genre): Promise<void> {
        const query = 'INSERT INTO genres (name) VALUES($1)';
        await this.exec(query, [genre.name]);
    }

    /**
     * Удаляет жанр
     * @param id
     */
    async delete(id: number): Promise<void> {
        const query = 'DELETE FROM genres WHERE id = $1';
        await this.exec(query, [id]);
    }

    /**
     * Изменяет жанр
     * @param genre
     */
    async update(genre: Genre): Promise<void> {
        // todo Add
    }

    protected createObject(fields: any): Awaitable<Genre> {
        return new Genre(fields.id, fields.name);
    }
}
