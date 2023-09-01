import { db, auth } from '../../../stores'
import { get } from 'svelte/store';

const DB = get(db)
const Auth = get(auth)

export const POST: any = async ({ request }) => {
	const req = await request.json();
	req.password = await Auth.hashPassword(req.password);

	const res = await Auth.signUp(req, Auth.Parse.generateRandomString(70))

	if (!res) {
		return new Response('User with email/username already exists', {status: 401})
	}
	
	
	const key = Auth.Parse.generateToken()
	const keyRes = await Auth.changeKey(res.uuid, key, 'auth')
	
	if (!keyRes) {
		return new Response("Something has gone wrong server-side. We apologise, please try again later. If this issue continues to occur please contact me at jaddalkwork@gmail.com", { status: 500 });
	}
	
	const cookie = Auth.Parse.generateCookie(key);
	return new Response('Redirect', {
		status: 200,
		headers: { 'set-cookie': cookie,
		Location: "/" },
	});
}