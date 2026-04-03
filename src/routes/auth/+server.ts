import { UserInfoSchem } from '$lib/zod.js';
import { error, json } from '@sveltejs/kit'

export const POST = async ({ request }): Promise<Response> => {
    const json = await request.json();
    const parser = UserInfoSchem(json.type);
    if (!parser) error(500, "Bad type!");
    const data = parser.safeParse(json);
    if (!data.success) error(500, data.error.message);

    //add user

    return json("Success");
}