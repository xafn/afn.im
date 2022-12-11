<script lang="ts">
	let zoom: boolean;
	let xRotation: number;
	let yRotation: number;

	function enterRotate3D(e: MouseEvent) {
		zoom = true;
		let img = e.target as HTMLImageElement;
		yRotation = 13 * ((e.offsetX - img.clientHeight / 2) / img.clientWidth);
		xRotation = -13 * ((e.offsetY - img.clientWidth / 2) / img.clientHeight);
	};

	function leaveRotate3D() {
		zoom = false;
		yRotation = 0;
		xRotation = 0;
	};
</script>

<div>
	<img
		src="art/afn.webp"
		alt="A drawing of me"
		on:mousemove={enterRotate3D}
		on:mouseleave={leaveRotate3D}
		style:transform="perspective(500px) {zoom ? 'scale(1.05)' : ''} rotateX({xRotation}deg) rotateY({yRotation}deg)"
	/>
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
		width: 425px;
		height: auto;
		z-index: 1;
		display: block;
		transition: width 0.4s var(--bezier-one), transform 0.4s var(--bezier-one);
		align-self: start;
	}

	div {
		z-index: 1;
		animation: float 6s ease-in-out infinite;
		animation-play-state: running;
	}

	@media (max-width: 1240px) {
		img {
			width: clamp(340px, 40vw, 425px);
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
