<script lang="ts">
	const supporters = [
		{
			name: 'afterst0rm',
			icon: '/supporters/afterst0rm.webp',
			message:
				"I wish I could do more, but I appreciate your work and creativity. You'll achieve great highs, brother. Big hugs from your Brazilian friend."
		},
		{
			name: 'Kevin T.',
			icon: '/supporters/kevin_t.webp',
			message: 'hi'
		},
		{
			name: 'Taku',
			icon: '/supporters/taku.webp',
			message: '3 Covfefe'
		},
		{
			name: 'notIvan',
			icon: '/supporters/notIvan.webp',
			message: 'i forgot ☠️'
		}
	];
</script>

<section class="wrapper">
	<div class="title">
		<h2>supporters</h2>
		<p>Thank you!</p>
	</div>

	<div class="donations">
		{#each supporters as { name, icon, message }}
			<div class="donator">
				<img src={icon} alt={name} />
				<h6>{name}</h6>
			</div>
		{/each}
	</div>
</section>

<style lang="scss">
	.title {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 0;
		margin-bottom: 1.5rem;

		@media (max-width: 868px) {
			align-items: normal;
		}
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

		@media (max-width: 868px) {
			justify-content: left;
		}
	}

	img {
		border-radius: 50%;
		height: 64px;
		width: 64px;
	}
</style>
