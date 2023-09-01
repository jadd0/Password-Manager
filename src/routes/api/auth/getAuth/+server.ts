import { error, redirect } from '@sveltejs/kit';
import { auth } from '../../../../stores';
import { get } from 'svelte/store';

const Auth = get(auth);

/** @type {import('./$types').Load} */
export const GET: any = async ({ url, fetch }) => {
	const accessKey = url.searchParams.get('accessKey')
	const key = url.searchParams.get('key')

	if (accessKey == undefined) {
		throw error(404, 'Missing either access key or key. Please try again with both the access key and the key.');
	}

	const accessKeyAuth = await Auth.checkAccessKey(accessKey);
	const keyAuth = await Auth.checkKey(key);

	if (!accessKeyAuth || !keyAuth) {
		throw error(401, 'Not authorised');
	}

	const newKeyRes = await fetch(`/api/auth/getKey?accessKey=${accessKey}`);

	if (!newKeyRes.ok) {
		throw error(
			500,
			'Sorry there has been an error generating a new key. Please log in and try again'
		);
	}

	const newKey = await newKeyRes.json()
	accessKeyAuth.newKey = newKey

	return new Response(JSON.stringify(accessKeyAuth));
};
