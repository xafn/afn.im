<script lang="ts">
	import Nav from '../atoms/Nav.svelte';
	let y: number;
</script>

<span>
	<nav class:scrolled={y > 20}>
		<ul>
			<Nav href="#home" section="home" isSelected={y < 350} />
			<Nav href="#about" section="about" isSelected={y > 350 && y < 675} />
			<Nav href="#aw" section="work" isSelected={y > 675} />
		</ul>
	</nav>
</span>

<!-- this is the coolest thing ever wtf?? -->
<svelte:window bind:scrollY={y} />

<style>
	span {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	nav {
		width: 100%;
		text-align: center;
		align-items: center;
		position: fixed;
		top: 0;
		padding: 1.25rem 0;
		z-index: 9999;
		background-color: var(--bg-color);
		backdrop-filter: blur(15px);
		-webkit-backdrop-filter: blur(15px);
		background-blend-mode: overlay;
		transition: all 0.5s ease;
	}

	nav ul {
		display: flex;
		gap: 4rem;
		justify-content: center;
	}

	@media (min-width: 868px) {
		nav {
			width: 50rem;
			border-radius: 12px;
		}
		.scrolled {
			border-bottom: 1.5px solid var(--yellow-opacity);
			padding: 0.5rem 0;
			margin-top: 0.5rem;
			width: 42rem;
			background-color: hsla(0, 13%, 11%, 0.792);
			box-shadow: 0px 15px 8px -10px rgba(0, 0, 0, 0.4);
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
