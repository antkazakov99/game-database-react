import Registry from "@/lib/Registry";
import UserReview from '@/lib/entities/UserReview';

export async function POST(request: Request): Promise<Response> {
    let response = {};

    const reviewData: {user_id: number, game_id: number, summary: string, rating: number} = await request.json();
    const userReview = new UserReview(reviewData.user_id, reviewData.game_id, reviewData.summary, reviewData.rating);
    await Registry.instance.userReviewService.add(userReview);

    return Response.json(JSON.stringify(response));
}
