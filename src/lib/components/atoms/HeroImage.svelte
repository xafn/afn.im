<script lang="ts">
	import { onMount } from 'svelte';

	let img: HTMLElement;
    
	onMount(() => {
		img!.addEventListener('mousemove', (e: any) => {
			const yRotation = 13 * ((e.layerX - img!.clientHeight / 2) / img!.clientWidth);
			const xRotation = -13 * ((e.layerY - img!.clientWidth / 2) / img!.clientHeight);
			img!.style.transform = `perspective(500px) scale(1.05) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
		});

		img!.addEventListener('mouseout', () => {
			img!.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)';
		});
	});
</script>

<div>
	<img src="HeroImage.webp" alt="A drawing of me." bind:this={img} />
</div>

<style>
	@keyframes float {
		0% {
			transform: translateY(7px);
		}
		50% {
			transform: translateY(-7px);
		}
		100% {
			transform: translateY(7px);
		}
	}

	img {
		border-radius: 48px;
		width: 450px;
		height: auto;
		z-index: 11;
		display: block;
		transition: width 0.4s var(--bezier-one), transform 0.4s var(--bezier-one),
			box-shadow 0.4s var(--bezier-one);
	}

	div {
		float: right;
		user-select: none;
		display: block;
		z-index: 12;
		animation: float 6s ease-in-out infinite;
		animation-play-state: running;
	}

	@media (max-width: 1240px) {
		img {
			min-height: 0vw;
			width: clamp(340px, 40vw, 450px);
		}

		div {
			display: flex;
			justify-content: center;
		}
	}

	@media (max-width: 768px) {
		img {
			display: none;
		}
	}
</style>
