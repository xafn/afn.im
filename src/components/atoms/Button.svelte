<script>
	export let side = false;
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<button on:click on:keypress class:button-with-side={side}>
	<div class:side />
	<slot />
</button>

<style>
	button {
		font-size: 100%;
		border-radius: 16px;
		border: none;
		display: flex;
		position: relative;
		flex-direction: row;
		width: max-content;
		cursor: pointer;
		background-color: var(--neutral-one);
		transition: filter 0.2s var(--bezier-one), transform 0.5s var(--bezier-one);
		user-select: none;
		margin: 0;
		padding: 1rem 2rem;
		color: var(--yellow);
		font-weight: 300;
		font-size: 1.6rem;
		font-family: var(--font-two);
		letter-spacing: -0.075em;
	}

	.button-with-side {
		padding: 1rem 2rem 1rem 3rem;
	}

	.side {
		position: absolute;
		border-radius: 16px 0 0 16px;
		top: 0;
		left: 0;
		content: '';
		height: 100%;
		width: 1.6rem;
		background-color: var(--yellow);
	}

	button:active {
		transform: scale(95%);
	}

	button:hover {
		filter: brightness(110%);
	}

	@media screen and (max-width: 868px) {
		button {
			text-align: center;
			justify-content: center;
			padding: 1rem 2rem;
			width: 100%;
		}

		.side {
			display: none;
		}

		button {
			font-size: clamp(1.1rem, 2vw, 1.9rem);
		}
	}
</style>
