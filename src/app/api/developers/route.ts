import Registry from "@/lib/Registry";

export async function GET(request: Request): Promise<Response> {
    const developers = await Registry.instance.developerService.getAll();

    return Response.json(developers.map((value) => {
        return {id: value.id, name: value.name}
    }));
}
