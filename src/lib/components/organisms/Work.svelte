<script>
	import ArtGrid from '$lib/components/molecules/ArtGrid.svelte';
</script>

<div>
	<div class="art-work wrapper" id="aw">
		<h2><span>art</span>:work</h2>
	</div>
	<ArtGrid />
</div>

<style>
	span {
		color: var(--yellow);
	}

	h2 {
		display: inline-block;
	}

	.art-work {
		display: flex;
		justify-content: center;
		margin-top: 0;
	}

	@media (max-width: 868px) {
		.art-work {
			justify-content: left;
            margin-bottom: 0.3rem;
		}
	}
</style>
