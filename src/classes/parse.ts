export class Parse {
	parseCookie(cookieList: any) {
		const result = {};
		let jwt = '';
		try {
			cookieList = cookieList.split('; ');

			for (let i in cookieList) {
				const cur = cookieList[i].split('=');
				result[cur[0]] = cur[1];
			}
		} catch {
			return false;
		}

		return result;
	}

	generateRandomString(length: number): string {
		const alphNumString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

		let key = '';
		for (let i = 0; i < (length || 40); i++) {
			key += alphNumString[Math.floor(Math.random() * alphNumString.length)];
		}

		return key
	}

	generateToken(length: number, time: any): string {
		// 5 minutes
		const ms = time || 300000;
		const expire = new Date().getTime() + ms;
		let key = '';

		key = `${expire}.${this.generateRandomString(40)}`;

		return key;
	}

	generateAccessToken(): string {
		return (this.generateCookie(this.generateRandomString(70), 'never'))
	}

	//expires in 2 days
	generateExpiry(length) {
		const date = new Date();
		const days = length || 1.5;
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

		return date;
	}

	generateCookie(key: string, expiry?: any, type?: string): string {
		if (expiry === undefined) expiry = 2;
		if (type === undefined) type = 'key'
		const cookie = `${type}=${key}; path=/; Expires=${expiry == 'never' ? 'expires=Thu, 01 Jan 2038 00:00:00 UTC' : this.generateExpiry(expiry)}; HostOnly=false; Secure=lax; httpOnly=true; SameSite=Strict;`;

		return cookie;
	}
}
