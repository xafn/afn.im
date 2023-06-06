<script lang="ts">
	import supporters from '../../util/supporters.json'
</script>

<section class="wrapper">
	<div class="title">
		<h2>supporters</h2>
		<p>Thank you!</p>
	</div>

	<div class="supporters">
		{#each supporters as { name, icon, message }}
			<div class="supporter">
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

	.supporter {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.supporters {
		justify-content: center;
		display: flex;
		flex-wrap: wrap;
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
