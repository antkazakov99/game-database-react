import Registry from "@/lib/Registry";

export async function GET(request: Request): Promise<Response> {
    const {searchParams} = new URL(request.url);
    const userId = searchParams.get('user_id');
    const gameId = searchParams.get('game_id');
    const usernames = searchParams.get('usernames');
    const average = searchParams.get('average');

    let response = {};
    if (userId && gameId)  {
        const userReview = await Registry.instance.userReviewService.get(parseInt(userId), parseInt(gameId));
        if (userReview) {
            response = {summary: userReview.summary, rating: userReview.rating};
        }
    }

    if (gameId && usernames && usernames === 'true') {
        response = await Registry.instance.userReviewService.getWithUsernames(parseInt(gameId));
    }

    if (gameId && average === 'true') {
        let rating = await Registry.instance.userReviewService.getAvgRatingByGameId(parseInt(gameId));
        response = {rating: rating};
    }

    return Response.json(response);
}
