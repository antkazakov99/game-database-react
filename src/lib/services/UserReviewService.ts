import AbstractService from "@/lib/services/AbstractService";
import UserReview from "@/lib/entities/UserReview";
import {Awaitable} from "@auth/core/types";

export default class UserReviewService extends AbstractService<UserReview> {
    /**
     * Возвращает рецензию пользователя о игре с указанным ID
     * @param userId
     * @param gameId
     */
    async get(userId: number, gameId: number): Promise<UserReview | null> {
        const query = 'SELECT user_id, game_id, summary, rating FROM user_reviews WHERE user_id = $1 AND game_id = $2';
        return await this.findOne(query, [userId, gameId]);
    }

    /**
     * Возвращает все пользовательские рецензии
     */
    async getAll(): Promise<UserReview[]> {
        const query = 'SELECT user_id, game_id, summary, rating FROM user_reviews';
        return await this.findMany(query);
    }

    /**
     * Добавляет пользовательскую рецензию
     * @param userReview
     */
    async add(userReview: UserReview): Promise<void> {
        const query = 'INSERT INTO user_reviews (user_id, game_id, summary, rating) VALUES($1, $2, $3, $4) ON CONFLICT (user_id, game_id) DO UPDATE SET (user_id, game_id, summary, rating) = ($1, $2, $3, $4)';
        await this.exec(query, [userReview.userId, userReview.gameId, userReview.summary, userReview.rating]);
    }

    /**
     * Удаляет пользовательскую рецензию
     * @param userId
     * @param gameId
     */
    async delete(userId: number, gameId: number): Promise<void> {
        const query = 'DELETE FROM user_reviews WHERE user_id = $1 AND game_id = $2';
        await this.exec(query, [userId, gameId]);
    }

    /**
     * Изменяет пользовательскую рецензию
     * @param userReview
     */
    async update(userReview: UserReview): Promise<void> {
        // todo Add
    }

    async getAvgRatingByGameId(id: number): Promise<number | null> {
        const query = 'SELECT AVG(rating) as rating FROM user_reviews WHERE game_id = $1';
        const rows = await this.exec(query, [id]);
        return rows[0].rating;
    }

    // todo replace in future
    async getWithUsernames(game_id: number) {
        const query = 'SELECT user_id, users.username as username, game_id, summary, rating FROM user_reviews JOIN users ON user_reviews.user_id = users.id WHERE game_id = $1';
        return await this.exec(query, [game_id]);
    }

    protected createObject(fields: { game_id: number, user_id: number, summary: string | null, rating: number | null }): Awaitable<UserReview> {
        return new UserReview(fields.user_id, fields.game_id, fields.summary, fields.rating);
    }
}