import Registry from "@/lib/Registry";
import User from "@/lib/entries/User";

export async function POST(request: Request): Promise<Response> {
    const registerData: {username: string, email: string, password: string} = await request.json();
    let response: {success: boolean, errors: {code: string, message: string}[]} = {success: true, errors: []};

    await Registry.instance.userClient.add(new User(null, registerData.username, registerData.email, registerData.password, false));

    return Response.json(response);
}
