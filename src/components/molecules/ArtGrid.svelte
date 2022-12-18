<script>
	import ArtCell from '../atoms/ArtCell.svelte';
</script>

<div class="grid-container">
	<div class="grid">
		<ArtCell art="painted_red" tall />
		<ArtCell art="drowning" />
		<ArtCell art="BL1NG!" tall />
		<ArtCell art="811" />
		<ArtCell art="diverge" tall />
		<ArtCell art="FADE" tall />
		<ArtCell
			art="flandre"
			tall
			shrink
			commission
			bottomText="Commissioned by Kevin T#0001 · Do not use"
		/>
		<ArtCell art="ribbons" tall />
		<ArtCell art="asumi" />
		<ArtCell art="doodle" />
	</div>
</div>

<style>
	.grid {
		gap: 0.8rem;
		grid-auto-rows: 230px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		width: min(90%, 72rem);
	}

	.grid:before {
		height: 300px;
		font-size: 175px;
		content: '&&';
		font-weight: 700;
		z-index: -1;
		user-select: none;
		transform: translateY(-160%) translateX(-40%);
		-webkit-text-stroke: 2px var(--white);
		color: transparent;
		opacity: 0.25;
		letter-spacing: -0.075em;
		position: absolute;
	}

	.grid-container {
		display: flex;
		justify-content: center;
		margin-bottom: 4rem;
	}

	@media screen and (max-width: 868px) {
		.grid {
			width: min(100%, 75rem);
			gap: 0.2rem;
			grid-template-columns: 1fr 1fr 1fr;
		}

		.grid::before {
			transform: translateY(-95%) translateX(-25%);
		}
	}

	@media screen and (max-width: 600px) {
		.grid {
			grid-auto-rows: 125px;
		}
	}
</style>
