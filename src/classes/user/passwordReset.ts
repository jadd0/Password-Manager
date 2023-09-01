import { User } from './user';

export class PasswordReset extends User {
	nodemailer: any;
	constructor(supabase: any, nodemailer: any) {
		super(supabase);
		this.nodemailer = nodemailer;
	}

	async checkKey(key: string): Promise<boolean> {
		if (key == undefined) return false;

		const res = await this.getValue({
			table: 'Keys',
			value: {
				key
			}
		});

		if (!res) return false;
		return true;
	}

	async checkUserHasKey(username: string): Promise<boolean | string> {
		const res = await this.getValue({
			table: 'Keys',
			value: {
				type: 'resetPassword',
				username
			}
		});
		
		if (!res) return false;
		return res.uuid;
	}

	async changeResetKey(username: string, key: string): Promise<boolean> {
		const uuid = await this.checkUserHasKey(username);

		if (!uuid) {
			const res = await this.newValue({
				table: 'Keys',
				values: {
					username,
					key,
					type: 'resetPassword'
				}
			});

			if (!res) return false;
			return true;
		}

		const { data, error } = await this.supabase
			.from('Keys')
			.update({ 'key': key })
			.match({ 'uuid': uuid })
			.select()

		if (error != undefined) return false;
		return true;
	}

	async sendEmail(email: string, username: string, area: string, code: string, time: any) {
		const user = process.env.VITE_NODEMAILER_EMAIL || import.meta.env.VITE_NODEMAILER_EMAIL;
		const pass = process.env.PASSWORD || import.meta.env.VITE_NODEMAILER_PASSWORD;

		time = new Date(time).toLocaleTimeString('en-GB', {
			hour: 'numeric',
			minute: 'numeric'
		});

		let transport = this.nodemailer.createTransport({
			host: 'smtp-relay.sendinblue.com',
			port: 587,
			auth: {
				user,
				pass
			}
		});

		transport.verify(function (error, success) {
			if (error) {
				return 'auth';
			}
		});

		const mailOptions = {
			from: 'jaddblog@jaddblog.com',
			to: email,
			subject: area,
			html: `<h1>Hey, ${username}!</h1>
			<br/>
			<p>You requested a link to reset your password, so just click this link below to do so.
			<br/>
			<br/>
			https://jadd.live/resetpassword/${username}.${code}
			<br/>
			<br/>
			This link will expire automatically after 15 minutes, at ${time}.
			If you did not request a link to reset your password, please contact me as soon as possible at jaddalkwork@gmail.com
			<br/>
			<br/>
			Thank you!</p>`
		};

		transport.sendMail(mailOptions, function (err, info) {
			
			if (err) {
				return false;
			}
		});

		return true;
	}
}
