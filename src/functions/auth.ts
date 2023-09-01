import { auth } from '../stores'
import { get } from "svelte/store"

const Auth = get(auth)


export async function getKey(cookies: any, fetch: any) {
  if (cookies.accessKey == undefined) return false

	const res = await fetch(`/api/auth/getKey?accessKey=${cookies.accessKey}`)
	if (!res.ok) return false
 
	return await res.json()
}

export async function getAuth(cookies: any, fetch: any) {
  if (cookies.key == undefined || cookies.accessKey == undefined) {
    return false
  }

	const res = await fetch(`/api/auth/getAuth?accessKey=${cookies.accessKey}&key=${cookies.key}`);
	return res
}

export async function authFlow(cookies: any, fetch: any) {
	
  cookies = Auth.Parse.parseCookie(cookies);

	const firstRes = await getAuth(cookies, fetch)
	if (firstRes.ok) return await firstRes.json()

	const key = await getKey(cookies, fetch)
	
	if (!key) return false

  cookies.key = key

	const secondRes = await getAuth(cookies, fetch)
	
	return await secondRes.json()
}