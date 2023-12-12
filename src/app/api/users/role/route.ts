import Registry from "@/lib/Registry";

export async function GET(request: Request): Promise<Response> {
    const {searchParams} = new URL(request.url);
    const username = searchParams.get('username');

    let response = {};
    if (username)  {
        const user = await Registry.instance.userService.getByUsername(username);
        if (user) {
            response = {role: user.isAdmin ? 'admin' : user};
        }
    }

    return Response.json(response);
}
