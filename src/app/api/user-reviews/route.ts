import Registry from "@/lib/Registry";

export async function GET(request: Request): Promise<Response> {
    const {searchParams} = new URL(request.url);
    const userId = searchParams.get('user_id');
    const gameId = searchParams.get('game_id');

    let response = {};
    if (userId && gameId)  {
        const userReview = await Registry.instance.userReviewService.get(parseInt(userId), parseInt(gameId));
        if (userReview) {
            response = {summary: userReview.summary, rating: userReview.rating};
        }
    }

    return Response.json(response);
}
