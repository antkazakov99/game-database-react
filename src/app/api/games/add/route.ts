import Registry from "@/lib/Registry";
import Game from '@/lib/entities/Game';
import Developer from '@/lib/entities/Developer';
import Publisher from '@/lib/entities/Publisher';
import Genre from '@/lib/entities/Genre';

export async function POST(request: Request): Promise<Response> {
    const gameData: { name: string, release: string | null, description: string, url: string, developers: string[], publishers: string[], genres: string[] } = await request.json();
    let response: { success: boolean, errors: { code: string, message: string }[] } = {success: true, errors: []};

    const game = new Game(null, gameData.name, gameData.release ? new Date(gameData.release) : null, gameData.description, gameData.url);
    game.developers = gameData.developers.map((value) => new Developer(parseInt(value), value));
    game.publishers = gameData.publishers.map((value) => new Publisher(parseInt(value), value));
    game.genres = gameData.genres.map((value) => new Genre(parseInt(value), value));
    await Registry.instance.gameService.add(game);

    return Response.json(response);
}
