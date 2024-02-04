<script>
	import Artwork from '../atoms/Artwork.svelte';
</script>

<div class="grid-container">
	<div class="grid">
		<Artwork art="painted_red" tall />
		<Artwork art="drowning" />
		<Artwork art="BL1NG!" tall />
		<Artwork art="811" />
		<Artwork art="lonely" tall subtitle="Acrylic Paint" />
		<Artwork art="diverge" tall />
		<Artwork
			art="flandre"
			tall
			shrink
			commission
			subtitle="Commissioned by Kevin T. · Do not use"
		/>
		<Artwork art="ribbons" tall />
		<Artwork art="asumi" />
		<Artwork art="doodle" />
	</div>
</div>

<style lang="scss">
	@import '../../styles/mixins.scss';

	.grid {
		gap: 0.8rem;
		grid-auto-rows: 230px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		width: min(90%, 72rem);

		@media screen and (max-width: 600px) {
			grid-auto-rows: 125px;
		}

		@media screen and (max-width: 868px) {
			width: min(100%, 75rem);
			gap: 0.2rem;
			grid-template-columns: 1fr 1fr 1fr;
		}

		&:before {
			@include outlineText($content: '&&', $translateX: -40%, $translateY: -160%);

			@media screen and (max-width: 868px) {
				@include outlineText($content: '&&', $translateX: -25%, $translateY: -95%);
			}
		}
	}

	.grid-container {
		display: flex;
		justify-content: center;
		margin-bottom: 4rem;
	}
</style>
