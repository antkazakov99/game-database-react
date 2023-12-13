import Registry from "@/lib/Registry";

export async function GET(request: Request): Promise<Response> {
    const {searchParams} = new URL(request.url);
    const gameId = searchParams.get('game_id');
    const names = searchParams.get('names');
    const average = searchParams.get('average');

    let response = {};

    if (gameId && names && names === 'true') {
        response = await Registry.instance.criticReviewService.getWithNames(parseInt(gameId));
    }

    if (gameId && average === 'true') {
        let rating = await Registry.instance.criticReviewService.getAvgRatingByGameId(parseInt(gameId));
        response = {rating: rating};
    }

    return Response.json(response);
}
