import Registry from "@/lib/Registry";

export async function POST(request: Request): Promise<Response> {
    const registerData: {username: string} = await request.json();
    let response: {success: boolean, error?: {code: string, message: string}} = {success: true};

    const user = await Registry.instance.userService.getByUsername(registerData.username);

    if (user !== null) {
        response.success = false;
        response.error = {code: 'usernameAlreadyInUse', message: 'Этот логин уже занят'};
    }

    return Response.json(response);
}

