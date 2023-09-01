<script lang="ts">
	export let auth: any;

	let open = false;

	function click() {
		open = !open;
	}
	
  async function signOut() {
    const res = await fetch('/api/signOut')
    location.reload()
  }

</script>

<div id="profile" class={`${open ? 'profileOpen' : ''}`}>
	<button class={`holder ${open ? 'holderOpen' : ''}`} on:click={click}>
		<div id="profilePicture">
			<img
				src="https://www.dailypaws.com/thmb/DQfQglzyKWlVSlsDwKPprF2iMSg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/golden-retriever-177213599-2000-a30830f4d2b24635a5d01b3c5c64b9ef.jpg"
				alt=""
			/>
		</div>
		<span class="username">{auth.username}</span>
		<i class={`bx bx-chevron-down ${open ? ' closed' : ''}`} id="dropdownTag" />
		<i class={`bx bx-chevron-up ${open ? '' : 'closed'}`} id="dropdownTag" />
	</button>

	<div id="profileDD" class={`${open ? 'open' : ''} `}>
		<div class="option title margin10">
			<i class="bx bx-user-circle" style="color:#787C7E" />
			<span>My stuff</span>
		</div>
		<a class="option card hover">
			<span>Profile</span>
		</a>
		<div class="option card hover">
			<span>Settings</span>
		</div>
		<div class="option title margin10">
			<i class="bx bxs-user-account" style="color:#787C7E" />
			<span>Account</span>
		</div>
		<div class="option title account margin5 hover">
			<img
				src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
				alt=""
			/>
      <span>Add account</span>
		</div>
		<a class="option title account margin5 hover" on:click={signOut}>
      <i class='bx bx-exit' style="color:#787C7E"></i>
      <span id="signOut">Sign out</span>
    </a>
	</div>
</div>

<style>
  .hover:hover {
    background: #363636;
  }

  .hover {
    cursor: pointer;
  }

  .margin5 {
    margin-top: 5px;
  }

  .margin10 {
    margin-top: 10px;
  }

  #signOut {
    color: red;
  }

  .account span {
    color: rgb(215, 218, 220) !important;
  }

  .account {
    gap: 10px !important;
  }

  .option img {
    width: 26px;
		height: 26px;
  }

	.title {
		display: flex;
		justify-content: start;
		align-items: center;
		gap: 12px;
		padding-left: 15px;
	}

	.option {
		height: 30px;
		width: 100%;
    transition: all 0.2s linear;
		/* border-bottom: 1px solid rgb(90, 90, 90); */
	}

	.card {
		display: flex;
		justify-content: start;
		align-items: center;
		padding-left: 50px;
	}

	.holder {
		width: 100%;
		height: 38px !important;
		display: flex;
		background: none;
		cursor: pointer;
	}

	#profile:hover {
		border: 2px solid rgb(90, 90, 90) !important;
	}

	.holderOpen {
		border-bottom: 2px solid rgb(90, 90, 90) !important;
	}

	.open {
		display: block !important;
	}

	.closed {
		display: none;
	}

	#dropdownTag {
		font-size: 25px;
		color: rgb(215, 218, 220);
		float: right;
		margin: auto 50px;
	}

	#profile {
		width: 170px;
		height: 40px;
		margin: 0 auto;
		margin-top: 5px;
		background: #212121;
		border-radius: 10px;
		border: 2px solid #333;
		/* display: flex; */
		transition: border 0.2s linear;
	}

	#profilePicture {
		width: 32px;
		height: 32px;
		/* border: 1px solid white; */
		border-radius: 200px;
		margin: 2px 0 0 10px;
		display: flex;
	}

	.profileOpen {
		border: 2px solid rgb(90, 90, 90) !important;
		height: 265px !important;
		width: 170px;
	}

	.borderTransition {
		transition: width 0.2s linear;
	}

	img {
		width: 32px;
		height: 32px;
		object-fit: cover;
		border-radius: 100px;
	}

	span {
		font-size: 14px;
		color: rgb(215, 218, 220);
	}

	.title span {
		color: rgb(120, 124, 126);
	}

	.username {
		font-size: 18px !important;
		color: rgb(215, 218, 220);
		margin: 7px 0 0 10px;
		/* margin: 10px auto; */
	}

	#profileDD {
		height: 100%;
		margin: 0 auto;
		display: none;
		overflow: hidden;
	}
</style>
