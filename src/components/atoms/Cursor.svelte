<script lang="ts">
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
		}, 1000);
	}
</script>

<svelte:window
	on:mousemove={mouseMove}
	on:mousedown={() => (scale = 1.25)}
	on:mouseup={() => (scale = 1)}
/>

<div
	class="pointer-ring"
	style="transform: translateX({mouseX - 15}px) translateY({mouseY - 15}px) scale({scale})"
	style:opacity
/>

<style lang="scss">
	.pointer-ring {
		left: 0;
		top: 0;
		height: 30px;
		width: 30px;
		border-radius: 100px;
		border: 1px solid var(--text-secondary);
		position: fixed;
		z-index: 30;
		opacity: 0;
		pointer-events: none;
		transition: 0.3s all var(--bezier-one);

		@media (pointer: coarse) {
			display: none;
		}
	}
</style>
