<div>
	<h1>
		hey, <br /> i'm <span>affan;</span>
	</h1>
</div>

<style>
	div {
		display: inline-block;
	}

	h1::before {
		height: 175px;
		font-size: 175px;
		content: '///';
		font-weight: 700;
		z-index: -1;
		user-select: none;
		transform: translateX(-95%);
		-webkit-text-stroke: 2px var(--white);
		color: transparent;
		opacity: 0.25;
		letter-spacing: -0.1em;
		position: absolute;
	}

	span {
		color: var(--yellow);
		font-weight: 600;
		font-size: 4rem;
		font-family: var(--font-two);
		letter-spacing: -0.075em;
		background-color: var(--grey-one);
		border-radius: 24px;
		padding: 0.4rem 2rem 0.3rem;
	}

	@media screen and (max-width: 768px) {
		h1 {
			font-size: 6rem;
		}

		span {
			font-size: 4rem;
		}
	}

	@media screen and (max-width: 1240px) {
		h1 {
			min-height: 0vw;
			font-size: clamp(4rem, 10vw, 6.25rem);
		}
		span {
			min-height: 0vw;
			border-radius: 16px;
			font-size: clamp(2.5rem, 6vw, 4rem);
		}
	}
</style>
