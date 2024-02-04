<script>
	import { onMount } from 'svelte';

	export let tip = '';
	export let active = false;

	let loaded = false;
	onMount(() => (loaded = true));
</script>

<!-- preventing layout shifts by checking if page is fully loaded. if not, return original slot -->
{#if loaded && tip}
	<div class="tooltip-wrapper">
		<span class="tooltip" class:active>
			{tip}
		</span>
		<span class="tooltip-slot">
			<slot />
		</span>
	</div>
{:else}
	<slot />
{/if}

<style lang="scss">
	.tooltip-wrapper {
		position: relative;
		display: inline-block;

		&:hover .tooltip {
			opacity: 1;
			visibility: initial;
			margin-top: -8px;
		}
	}

	.tooltip {
		position: absolute;
		display: inline-block;
		white-space: nowrap;
		opacity: 0;
		visibility: hidden;
		transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out, margin-top 0.2s ease-in-out;
		left: 50%;
		top: 0%;
		line-height: normal;
		transform: translate(-50%, -120%);
		padding: 0.15rem 0.5rem;
		border-radius: 6px;
		background-color: var(--accent);
		color: var(--elevation-one);
		font-size: 0.9rem;
		font-family: var(--font-two);
		font-weight: 300;
		letter-spacing: -0.075em;

		// the little triangle below the tooltip v
		&::after {
			border-left: solid transparent 10px;
			border-right: solid transparent 10px;
			border-top: solid var(--accent) 10px;
			bottom: -8px;
			content: ' ';
			height: 0;
			width: 0;
			left: 50%;
			margin-left: -10px;
			position: absolute;
		}

		&.active {
			opacity: 1;
			visibility: initial;
			margin-top: -8px;
		}
	}
</style>
