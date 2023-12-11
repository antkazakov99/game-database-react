import Registry from "@/lib/Registry";

export async function GET(request: Request): Promise<Response> {
    const publishers = await Registry.instance.publisherService.getAll();

    return Response.json(publishers.map((value) => {
        return {id: value.id, name: value.name}
    }));
}
