<script>
	import Tooltip from './Tooltip.svelte';

	export let icon = 'Github';
	export let link = '';
	export let tip = '';
</script>

<Tooltip {tip}>
	<div>
		<a href={link} target="_blank" rel="noreferrer">
			<img src="icons/{icon}.svg" alt={icon} />
		</a>
	</div>
</Tooltip>

<style lang="scss">
	a {
		transition: all 0.3s var(--bezier-one);
		display: flex;
		justify-content: center;
		align-items: center;
		width: 50px;
		height: 50px;
		background-color: transparent;
		border: none;
		border-radius: 10px;
		cursor: pointer;
	}

	img {
		height: 26px;
		width: 26px;
		opacity: 0.7;
		transition: all 0.3s var(--bezier-one);
	}

	div {
		transition: all 0.3s var(--bezier-one);

		&:hover {
			img {
				opacity: 1;
			}
			a {
				background-color: var(--neutral-one);
			}
		}

		&:active {
			transform: scale(98%);
		}
	}
</style>
