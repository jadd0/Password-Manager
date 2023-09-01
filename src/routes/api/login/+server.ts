import { db, auth } from '../../../stores';
import { get } from 'svelte/store';

const DB = get(db);
const Auth = get(auth);

export const POST: any = async ({ request }) => {
	const body = await request.json();
	const username = body.username;
	const password = body.password;

	const auth = await Auth.authenticate(username.toLowerCase(), password);
	
	if (!auth) {
		return new Response('Invalid credentials', { status: 406 });
	}

	const cookie = Auth.Parse.generateCookie(auth, 'never', 'accessKey');
	
	return new Response('Redirect', {
		status: 200,
		headers: {
			'set-cookie': cookie,
			Location: '/'
		}
	});
};
