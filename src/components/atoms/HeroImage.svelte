<script lang="ts">
	let zoom: boolean;
	let xRotation: number;
	let yRotation: number;

	function enterRotate3D(e: MouseEvent) {
		zoom = true;
		let img = e.target as HTMLDivElement;
		yRotation = 13 * ((e.offsetX - img.clientHeight / 2) / img.clientWidth);
		xRotation = -13 * ((e.offsetY - img.clientWidth / 2) / img.clientHeight);
	}

	function leaveRotate3D() {
		zoom = false;
		yRotation = 0;
		xRotation = 0;
	}
</script>

<div class="img-container">
	<div
		on:mousemove={enterRotate3D}
		on:mouseleave={leaveRotate3D}
		class="img"
		style:background-image="url(art/afn.webp)"
		style:transform="perspective(500px) {zoom ? 'scale(1.05)' : ''} rotateX({xRotation}deg) rotateY({yRotation}deg)"
	/>
</div>

<style lang="scss">
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

	.img {
		border-radius: 48px;
		width: 425px;
		height: 400px;
		z-index: 1;
		display: block;
		transition: width 0.4s var(--bezier-one), transform 0.4s var(--bezier-one);
		align-self: start;
		background-color: var(--neutral-one);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;

		@media (max-width: 768px) {
			display: none;
		}

		@media (max-width: 1240px) {
			width: clamp(340px, 40vw, 425px);
			height: clamp(300px, 40vw, 400px);
		}
	}

	.img-container {
		z-index: 1;
		animation: float 6s ease-in-out infinite;
		animation-play-state: running;

		@media (max-width: 1240px) {
			display: flex;
			justify-content: center;
		}
	}
</style>
