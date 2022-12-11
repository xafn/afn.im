<script lang="ts">
	import { onMount } from 'svelte';

	let mouseX: number;
	let mouseY: number;
	let opacity: number;
	let scale = 1;
	let timeout: ReturnType<typeof setTimeout>;

	function mouseMove(e: MouseEvent) {
		mouseX = e.clientX;
		mouseY = e.clientY;
		opacity = 1;

		clearTimeout(timeout);
		timeout = setTimeout(() => {
			opacity = 0;
		}, 1000)
	}


	function enlargen() {
		scale = 1.15;
	}

	function normalSize() {
		scale = 1;
	}
</script>

<svelte:window on:mousemove={mouseMove} on:mousedown={enlargen} on:mouseup={normalSize} />

<div
	class="pointer-ring"
	style="transform: translateX({mouseX - 15}px) translateY({mouseY - 15}px) scale({scale})"
	style:opacity={opacity}
/>

<style>
	.pointer-ring :global(*):hover {
		background-color: brown;
	}

	.pointer-ring {
		left: 0;
		top: 0;
		height: 30px;
		width: 30px;
		border-radius: 100px;
		border: 1px solid var(--white-two);
		position: fixed;
		z-index: 8;
		opacity: 0;
		pointer-events: none;
		transition: 0.3s all var(--bezier-one);
	}

	@media only screen and (max-width: 868px) {
		.pointer-ring {
			display: none;
		}
	}
</style>
