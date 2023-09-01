<script lang="ts">
	import Input from '../__input/+page.svelte';
	let username = "";
	let password = "";
	let wrong = false;
	let shake = false
	let loading = false

	

	function enterQuery(event: Event) {
		if (event.key == "Enter") {
			submit();
		}
		wrong = false

	}

	const submit = async () => {
		loading = true
		const response = await fetch("/api/login", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		});

		if (response.ok) {
			window.location = "/home";
		}

		if (response.ok == false) {
			loading = false
			wrong = true;
			shake = true
		}
		setTimeout(() => {
			shake = false
		}, 300);		
	};
</script>

<svelte:window on:keyup={enterQuery} />

<svelte:head>
	<title>Login</title>
</svelte:head>

<body>
	<div id="loginForm">
		<Input prop='Username' {wrong} {shake} bind:value={username} />
		<Input prop='Password' {wrong} {shake} bind:value={password} />
		
    <a href="/forgotpassword"><span>Forgotten password?</span></a>

		<button id="loginButton" on:click={submit}>Login</button>
	</div>
</body>

<style>
	@import '/styles.css';

  span {
    font-size: 15px;
  }
</style>
