<script lang="ts">
	const donators = [
		{
			name: 'afterst0rm',
			icon: 'https://cdn.discordapp.com/avatars/282584705218510848/da56f904f34993aceba80fece31bb843.webp?size=4096',
			message:
				"I wish I could do more, but I appreciate your work and creativity. You'll achieve great highs, brother. Big hugs from your Brazilian friend."
		},
		{
			name: 'Kevin T.',
			icon: 'https://cdn.discordapp.com/avatars/107244631724392448/472814086257707a120723bd3f4381c6.webp?size=4096',
			message: 'hi'
		}
	];
</script>

<section class="wrapper">
	<div class="title">
		<h2>donators</h2>
        <p>Thank you!</p>
	</div>

	<div class="donations">
		{#each donators as { name, icon, message }}
			<div class="donator">
				<img src={icon} alt={name} />
				<h6>{name}</h6>
			</div>
		{/each}
	</div>
</section>

<style>
    
	.title {
        display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 0;
        margin-bottom: 1.5rem;
	}

	.donator {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.donations {
		justify-content: center;
		display: flex;
		gap: 2rem;
		margin-bottom: 3rem;
	}

	img {
		border-radius: 50%;
		height: 64px;
		width: 64px;
	}

	@media (max-width: 868px) {
		.title {
			align-items: normal;
		}

		.donations {
			justify-content: left;
		}
	}
</style>
