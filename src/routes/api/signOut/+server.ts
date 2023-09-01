import { get } from 'svelte/store';
import { circle } from '../../../stores'
import { authFlow } from '../../../functions/auth'
import { user } from '../../../stores';
import { error } from '@sveltejs/kit';

const User = get(user);
const Circle = get(circle);

/** @type {import('./$types').Load} */
export async function GET({ request, fetch, cookies, url }) {
	const auth = await authFlow(request.headers.get('cookie'), fetch);

	if (!auth) {
		throw error(401, 'Not authorised');
	}

	cookies.set('accessKey', '', {
		path: '/',
		HostOnly: false,
		Secure: 'lax',
		httpOnly: true,
		SameSite: 'Strict'
	});

	return new Response();
}