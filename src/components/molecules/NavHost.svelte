<script lang="ts">
	import Nav from '../atoms/Nav.svelte';
	let y: number;
</script>

<nav>
	<div class:scrolled={y > 20}>
		<ul>
			<Nav href="#home" section="/" isSelected={y < 350}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="var(--accent)"
					viewBox="0 0 24 24"
					><path fill="none" d="M0 0h24v24H0z" /><path
						d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
					/></svg
				>
			</Nav>
			<Nav href="#about" section="about" isSelected={y > 350 && y < 675}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="var(--accent)"
					viewBox="0 0 24 24"
					><path fill="none" d="M0 0h24v24H0z" /><path
						d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
					/></svg
				>
			</Nav>
			<Nav href="#aw" section="work" isSelected={y > 675}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="var(--accent)"
					viewBox="0 0 24 24"
					><path fill="none" d="M0 0h24v24H0z" /><path
						d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"
					/></svg
				>
			</Nav>
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
			border-bottom: 1.5px solid var(--accent-opacity);
			padding: 0.5rem 0;
			margin-top: 0.5rem;
			width: 34rem;
			background-color: var(--elevation-five);
			box-shadow: 0px 15px 8px -10px rgba(0, 0, 0, 0.4);
		}
	}

	@media (max-width: 868px) {
		div {
			bottom: 0;
			top: auto;
			padding: 0rem;
			background-color: var(--elevation-one);
		}

		div ul {
			display: flex;
			justify-content: space-evenly;
			gap: 2vw;
		}
	}
</style>
