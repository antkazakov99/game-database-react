import {Awaitable} from "@auth/core/types";
import AbstractService from "@/lib/services/AbstractService";
import CriticReview from "@/lib/entities/CriticReview";

export default class CriticReviewService extends AbstractService<CriticReview> {
    /**
     * Возвращает рецензию критика об игре
     * @param criticId
     * @param gameId
     */
    async get(criticId: number, gameId: number): Promise<CriticReview | null> {
        const query = 'SELECT critic_id, game_id, summary, url, rating FROM critic_reviews WHERE game_id = $1 AND critic_id = $2';
        return await this.findOne(query, [criticId, gameId]);
    }

    /**
     * Возвращает все рецензии критиков
     */
    async getAll(): Promise<CriticReview[]> {
        const query = 'SELECT critic_id, game_id, summary, url, rating FROM critic_reviews';
        return await this.findMany(query);
    }

    /**
     * Добавляет рецензию критика
     * @param criticReview
     */
    async add(criticReview: CriticReview): Promise<void> {
        const query = 'INSERT INTO critic_reviews (critic_id, game_id, summary, url, rating) VALUES($1, $2, $3, $4, $5)';
        await this.exec(query, [criticReview.criticId, criticReview.gameId, criticReview.summary, criticReview.url, criticReview.rating]);
    }

    /**
     * Удаляет рецензию критика
     * @param criticId
     * @param gameId
     */
    async delete(criticId: number, gameId: number): Promise<void> {
        const query = 'DELETE FROM critic_reviews WHERE critic_id = $1 AND game_id = $2';
        await this.exec(query, [criticId, gameId]);
    }

    /**
     * Изменяет рецензию критика
     * @param criticReview
     */
    async update(criticReview: CriticReview): Promise<void> {
        // todo Add
    }

    protected createObject(fields: {
        critic_id: number,
        game_id: number,
        summary: string,
        url: string,
        rating: number | null
    }): Awaitable<CriticReview> {
        return new CriticReview(fields.critic_id, fields.game_id, fields.summary, fields.url, fields.rating);
    }
}