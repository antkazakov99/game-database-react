import AbstractService from "@/lib/services/AbstractService";
import Registry from "@/lib/Registry";
import {Awaitable} from "@auth/core/types";
import FavoriteGame from "@/lib/entities/FavoriteGame";
import Developer from "@/lib/entities/Developer";

export default class FavoriteGameService extends AbstractService<FavoriteGame> {
    /**
     * Возвращает запись о игре в списке избранного пользователя
     * @param userId
     * @param gameId
     */
    async get(userId: number, gameId: number) {
        const query = 'SELECT user_id, game_id, status_id FROM favorite_games WHERE user_id = $1 AND game_id = $2';
        return await this.findOne(query, [userId, gameId]);
    }

    /**
     * Возвращает игры в списке избранного пользователя
     * @param userId
     */
    async getByUserId(userId: number) {
        const query = 'SELECT user_id, game_id, status_id FROM favorite_games WHERE user_id = $1';
        return await this.findMany(query, [userId]);
    }

    /**
     * Добавляет игру в список избранного пользователя
     * @param favoriteGame
     */
    async add(favoriteGame: FavoriteGame): Promise<void> {
        const query = 'INSERT INTO favorite_games (user_id, game_id, status_id) VALUES ($1, $2, $3)';
        await this.exec(query, [favoriteGame.userId, favoriteGame.gameId, favoriteGame.status?.id]);
    }

    /**
     * Удаляет игру из список избранного пользователя
     * @param userId
     * @param gameId
     */
    async delete(userId: number, gameId: number): Promise<void> {
        const query = 'DELETE FROM favorite_games WHERE user_id = $1 AND game_id = $2';
        await this.exec(query, [userId, gameId]);
    }

    /**
     * Изменяет статус игры в списке избранного
     * @param favoriteGame
     */
    async update(favoriteGame: FavoriteGame): Promise<void> {
        // todo Add
    }

    protected createObject(fields: {
        user_id: number,
        game_id: number,
        status_id: number | null
    }): Awaitable<FavoriteGame> {
        let status = null;

        if (fields.status_id === null) {
            return new FavoriteGame(fields.user_id, fields.game_id, status);
        }

        return (async () => {
            const status = await Registry.instance.statusService.getById(fields.status_id!!);
            return new FavoriteGame(fields.user_id, fields.game_id, status);
        })();
    }
}
