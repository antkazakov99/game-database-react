import {Awaitable} from "@auth/core/types";
import AbstractService from "@/lib/services/AbstractService";
import Genre from "@/lib/entities/Genre";

export default class GenreService extends AbstractService<Genre> {
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
     * Возвращает все существующие жанры
     */
    async getAll(): Promise<Genre[]> {
        const query = 'SELECT id, name FROM genres';
        return await this.findMany(query);
    }

    async getByGameId(gameId: number): Promise<Genre[]> {
        const query = 'SELECT genres.id, genres.name FROM genres INNER JOIN games_genres ON genres.id = games_genres.genre_id WHERE games_genres.game_id = $1';
        return await this.findMany(query, [gameId]);
    }

    /**
     * Возвращает жанр с указанным ID
     * @param id
     */
    async getById(id: number): Promise<Genre | null> {
        const query = 'SELECT id, name FROM genres WHERE id = $1';
        return await this.findOne(query, [id]);
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
