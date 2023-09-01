<script lang="ts">
	import Search from './searchBar/+page.svelte';
	import Profile from './profile/+page.svelte';

  export let auth: any
</script>

<div id="navbar">
	<div class="container">
		<a href='/home' class="navBox">Home</a>
		<a href='/circles' class="navBox">Circles</a>
	</div>
	<Search />
	<div></div>	
	<div id="profile">
		<Profile auth={auth} />
	</div>
</div>

<style>
	@import 'https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css';
	@import '/styles.css';

	@font-face {
		font-family: 'Jakarta';
		src: url('/fonts/Jakarta.ttf');
	}

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Jakarta';
	}

	a {
		text-decoration: none;
	}

	#navbar {
		width: 100vw;
		height: 50px;
		background: #282828;
		box-shadow: 0 5px 30px -6px black;
		position: fixed;
		top: 0;
    display: grid;
    grid-template-columns: 32.5vw 35vw 15vw 12.5vw;
    grid-template-rows: auto auto auto auto;
		z-index: 1000;
	}

  .navBox {
    width: 25%;
    height: 30px;
		color: rgb(215, 218, 220);
    font-weight: 550;
    font-size: 19px;
  }

  #profile {
    min-width: 50% !important;
    height: 100%;
  }

	.container {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
	}
</style>
