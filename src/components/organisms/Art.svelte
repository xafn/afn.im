<script>
	import ArtGrid from '../../components/molecules/ArtGrid.svelte';
	import Tooltip from '../atoms/Tooltip.svelte';
</script>

<section>
	<div class="wrapper" id="aw">
		<Tooltip tip="Click on an artwork">
			<h2><span>art</span>:work</h2>
		</Tooltip>
	</div>
	<ArtGrid />
</section>

<style lang="scss">
	span {
		color: var(--accent);
	}

	h2 {
		display: inline-block;
		margin-bottom: 1rem;
	}

	div {
		display: flex;
		justify-content: center;
		margin-top: 0;

		@media (max-width: 868px) {
			justify-content: left;
			margin-bottom: 0.3rem;
		}
	}
</style>
