<script>
	import ArtGrid from '../../components/molecules/ArtGrid.svelte';
</script>

<section>
	<div class="wrapper" id="aw">
		<h2><span>art</span>:work</h2>
	</div>
	<ArtGrid />
</section>

<style>
	span {
		color: var(--yellow);
	}

	h2 {
		display: inline-block;
	}

	div {
		display: flex;
		justify-content: center;
		margin-top: 0;
	}

	@media (max-width: 868px) {
		div {
			justify-content: left;
            margin-bottom: 0.3rem;
		}
	}
</style>
