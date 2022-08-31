<script>
	function handleClick() {
		const el = document.querySelector('#aw');
		if (!el) return;
		el.scrollIntoView(true);
	}
</script>

<div>
	<button on:click={handleClick}>
		<div class="rect" />
		<span class="side" />
		<h2>
			<slot />
		</h2>
	</button>
</div>

<style>
	div {
		transition: 0.5s var(--bezier-one);
	}

	.rect {
		position: absolute;
		background-color: var(--yellow);
		width: 1.6rem;
		height: 100%;
		border-top-left-radius: 20px;
		border-bottom-left-radius: 20px;
		top: 0;
		left: 0;
		transition: 0.3s var(--bezier-one);
		z-index: 0;
	}

	button {
		position: absolute;
		border-radius: 20px;
        border: none;
		padding: 1rem 2rem 1rem 3rem;
		cursor: pointer;
		background-color: var(--grey-one);
		transition: padding 0.3s var(--bezier-one), transform 0.5s var(--bezier-one);
		user-select: none;
		margin: 0;
	}

	h2 {
		transition: 0.3s ease-out;
		color: var(--yellow);
		z-index: 88;
	}

	button:hover {
		padding: 1.5rem 2.5rem 1.5rem 3.5rem;
	}

	div:active {
		transform: scale(95%);
	}

	@media screen and (max-width: 1240px) {
		h2 {
			min-height: 0vw;
			font-size: clamp(1.1rem, 2vw, 1.9rem);
		}
	}

	@media screen and (max-width: 768px) {
		button {
			position: inherit;
			padding: 0.9rem 2rem 0.9rem 2rem;
			border-radius: 17px;
			width: 100%;
		}

		button:hover {
			padding: 0.9rem 2rem 0.9rem 2rem;
		}
		.rect {
			display: none;
			border-top-left-radius: 17px;
			border-bottom-left-radius: 17px;
		}
	}

	@media (hover: none) {
		button:hover {
			padding: 1rem 2rem 1rem 3rem;
		}
	}
</style>
