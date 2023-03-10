<script lang="ts">
	import Nav from '../atoms/Nav.svelte';
	let y: number;
</script>

<nav>
	<div class:scrolled={y > 20}>
		<ul>
			<Nav href="#home" section="/" isSelected={y < 350} />
			<Nav href="#about" section="about" isSelected={y > 350 && y < 675} />
			<Nav href="#aw" section="work" isSelected={y > 675} />
		</ul>
	</div>
</nav>

<!-- this is the coolest thing ever wtf?? -->
<svelte:window bind:scrollY={y} />

<style lang="scss">
	nav {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	div {
		width: 100%;
		text-align: center;
		align-items: center;
		position: fixed;
		top: 0;
		padding: 1.25rem 0;
		z-index: 15;
		background-color: var(--bg-color);
		backdrop-filter: blur(15px);
		-webkit-backdrop-filter: blur(15px);
		background-blend-mode: overlay;
		transition: all 0.5s ease;

		ul {
			display: flex;
			gap: 4rem;
			justify-content: center;
		}
	}
	@media (min-width: 868px) {
		div {
			width: 40rem;
			border-radius: 12px;
		}
		.scrolled {
			border-bottom: 1.5px solid var(--yellow-opacity);
			padding: 0.5rem 0;
			margin-top: 0.5rem;
			width: 34rem;
			background-color: var(--neutral-five);
			box-shadow: 0px 15px 8px -10px rgba(0, 0, 0, 0.4);
		}
	}

	@media (max-width: 868px) {
		div {
			bottom: 0;
			top: auto;
			padding: 0rem;
			background-color: #1a1616;
		}

		div ul {
			display: flex;
			justify-content: space-evenly;
			gap: 2vw;
		}
	}
</style>
