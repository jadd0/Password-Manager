<script lang="ts">
	import { onMount } from "svelte";
	export let value: any;
	let inputVar: any;

	
  let open: boolean = false
	

  function click() {
    open = !open
  }

	function inpDot(e: any) {
		if (e.originalTarget.nodeName != 'INPUT') {
			if (e.key == '.') {
				inputVar.focus()
		}
		}
		
	}
	
</script>

<svelte:window on:keydown={inpDot} />

<button class='inputHolder'>
	<input
		type="text"
		class="userInput"
		placeholder="Search..."
		bind:value
		bind:this={inputVar}
		required
	/>
	<div class='border' />
	<div class='dropdown' />
</button>

<style>
	.inputHolder {
		width: 35vw;
		padding-bottom: 5px;
		margin-top: 5px;
    margin-bottom: 5px;
		background: #212121;
		border-radius: 10px;
		color: white;
		text-align: left;
		border: 2px solid #333;
		transition: border 0.2s linear;
    height: 40px;
	}

	.userInput {
		width: 92.5%;
		font-size: 16px !important;
		max-height: 30px;
		margin-left: 10px;
		margin-top: 8px;
		background: #212121;
		color: rgb(215, 218, 220);
		text-align: left;
	}

	/* .userInput:focus {
    border-bottom: 2px solid ;
  } */

	.border {
		position: relative;
		bottom: -6.5px;
		height: 2px;
		width: 100%;
		background: rgb(90, 90, 90);
		display: none;
	}

	.inputHolder:focus-within .border {
		display: block;
	}

	.inputHolder:focus-within {
		border: 2px solid rgb(90, 90, 90);
    height: 400px;
	}

	.dropdown {
		width: 35vw;
		min-height: 400px;
		margin: 0 auto;
		display: none;
	}

	.inputHolder:focus-within .dropdown {
		display: block;
	}
</style>
