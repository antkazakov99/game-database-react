import Registry from "@/lib/Registry";

export async function GET(request: Request): Promise<Response> {
    const genres = await Registry.instance.genreService.getAll();

    return Response.json(genres.map((value) => {
        return {id: value.id, name: value.name}
    }));
}
