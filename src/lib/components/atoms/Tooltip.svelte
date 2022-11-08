<script>
	export let tip = '';
	export let active = false;
</script>

<div class="tooltip-wrapper">
	<span class="tooltip-slot">
		<slot />
	</span>
	<div class="tooltip" class:active>
		<h7>{tip}</h7>
	</div>
</div>

<style>
	.tooltip-wrapper {
		position: relative;
		display: inline-block;
	}

	.tooltip {
		position: absolute;
		display: inline-block;
		white-space: nowrap;
		opacity: 0;
		visibility: hidden;
		transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out, margin-top 0.2s ease-in-out;
		left: 50%;
		transform: translate(-50%, -100%);
		margin-top: -6px;
		display: inline-block;
		padding: 0rem 0.75rem;
		border-radius: 6px;
		background-color: var(--yellow);
	}

	.tooltip::after {
		border-left: solid transparent 10px;
		border-right: solid transparent 10px;
		border-top: solid var(--yellow) 10px;
		bottom: -8px;
		content: ' ';
		height: 0;
		width: 0;
		left: 50%;
		margin-left: -10px;
		position: absolute;
	}

	h7 {
		color: var(--grey-one);
	}

	.tooltip.active {
		opacity: 1;
		visibility: initial;
        margin-top: -8px;
	}

	.tooltip-slot:hover + .tooltip {
		opacity: 1;
		visibility: initial;
        margin-top: -8px;
	}
</style>
