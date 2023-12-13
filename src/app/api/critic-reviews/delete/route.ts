import Registry from "@/lib/Registry";
import UserReview from '@/lib/entities/UserReview';

export async function POST(request: Request): Promise<Response> {
    let response = {};

    const reviewData: {user_id: number, game_id: number} = await request.json();
    await Registry.instance.userReviewService.delete(reviewData.user_id, reviewData.game_id);

    return Response.json(JSON.stringify(response));
}
