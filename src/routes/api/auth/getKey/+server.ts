import { error, redirect } from '@sveltejs/kit';
import { auth } from '../../../../stores';
import { get } from 'svelte/store';

const Auth = get(auth);

/** @type {import('./$types').Load} */
export const GET: any = async ({ url }) => {
  const accessKey = url.searchParams.get('accessKey')

	if (accessKey == undefined) {
		throw error(404, 'No access key provided. Please try again by providing the access key');
	}

	const auth = await Auth.checkAccessKey(accessKey);
	if (!auth) {
		throw error(401, 'Not authorised');
	}

  const key = await Auth.changeKey(auth.uuid, Auth.Parse.generateToken(), 'auth')
	
  if (!key) {
    throw error(500, 'Sorry, there has been an error on our side whilst trying to update your key. Please try again later. If this coninues to occur, please contact me at jaddalkwork@gmail.com.');
  }

	return new Response(JSON.stringify(key));
};
