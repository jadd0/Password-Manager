export class SupabaseFeatures {
	constructor(supabase, bcrypt) {
		this.supabase = supabase;
		this.bcrypt = bcrypt;
	}

	async deleteData(table, column, opt) {
		const { data, error } = await this.supabase
			.from(table)
			.delete()
			.match({ [column]: opt });
		if (error == undefined) return true
		return false
	}

	async checkIfMoodPresent(username) {
		const date = this.getDate();

		const { data, error } = await this.supabase
			.from("moods")
			.select("*")
			.eq("username", username);

		const res = data.find((item) => item.date === date);

		if (res == undefined) return true;

		const del = await this.deleteData('moods', 'id', res.id)

		if (del) return true
		return false
	}

	async getMoods(username) {
		const { data, error } = await this.supabase
			.from("moods")
			.select("*")
			.eq("username", username);

		if (error == undefined) return data;
		return false;
	}

	

	

	


	




	

}
