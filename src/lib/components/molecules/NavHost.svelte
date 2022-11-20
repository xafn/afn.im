<script lang="ts">
	import Nav from '../atoms/Nav.svelte';
	let y: number;
</script>

<nav class:scrolled={y > 20}>
	<ul>
		<Nav href="#home" section="home" isSelected={y < 350} />
		<Nav href="#about" section="about" isSelected={y > 350 && y < 675} />
		<Nav href="#aw" section="work" isSelected={y > 675} />
	</ul>
</nav>

<!-- this is the coolest thing ever wtf?? -->
<svelte:window bind:scrollY={y} />

<style>
	nav {
		width: 100%;
		text-align: center;
		align-items: center;
		position: fixed;
		top: 0;
		padding: 1.25rem 0;
		z-index: 999;
		background-color: #181414bb;
		backdrop-filter: blur(15px);
		-webkit-backdrop-filter: blur(15px);
		background-blend-mode: overlay;
		transition: all 0.2s ease;
	}

	nav ul {
		display: flex;
		gap: 4rem;
		justify-content: center;
	}

	@media (min-width: 869px) {
		.scrolled {
			border-bottom: 1.5px solid var(--grey-one);
			padding: 0.9rem 0;
		}
	}

	@media (max-width: 868px) {
		nav {
			bottom: 0;
			top: auto;
			padding: 0rem;
			background-color: #1a1616;
		}

		nav ul {
			display: flex;
			justify-content: space-evenly;
			gap: 2vw;
		}
	}
</style>
