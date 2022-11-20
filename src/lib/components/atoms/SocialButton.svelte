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

<style>
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

	div {
		transition: all 0.3s var(--bezier-one);
	}

	div:hover > a {
		background-color: var(--grey-one);
	}

	div:hover img {
		opacity: 1;
	}

	div:active {
		transform: scale(98%);
	}

	img {
		height: 26px;
		width: 26px;
		opacity: 0.7;
		transition: all 0.3s var(--bezier-one);
	}
</style>
