import Registry from "@/lib/Registry";
import Game from '@/lib/entities/Game';
import Developer from '@/lib/entities/Developer';
import Publisher from '@/lib/entities/Publisher';
import Genre from '@/lib/entities/Genre';

export async function POST(request: Request): Promise<Response> {
    const gameData: { name: string, release: string | null, description: string, url: string, developers: string[], publishers: string[], genres: string[], vertical_cover: string | null, horizontal_cover: string | null } = await request.json();
    let response: { success: boolean, errors: { code: string, message: string }[] } = {success: true, errors: []};
    await Registry.instance.gameService.updateRaw(gameData);
    return Response.json(response);
}
