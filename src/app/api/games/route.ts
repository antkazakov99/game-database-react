import Registry from "@/lib/Registry";

export async function GET(request: Request): Promise<Response> {
    const {searchParams} = new URL(request.url);
    const id = searchParams.get('id');

    let response = {};
    if (id) {
        const game = await Registry.instance.gameService.getByIdRaw(parseInt(id));
        if (game) {
            response = game
        }
    }

    return Response.json(response);
}
