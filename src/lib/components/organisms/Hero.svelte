<script>
	import HeroImage from '$lib/components/atoms/HeroImage.svelte';
	import Button from '../atoms/Button.svelte';

	function handleClick() {
		const el = document.querySelector('#aw');
		if (!el) return;
		el.scrollIntoView(true);
	}
</script>

<section id="home" class="wrapper">
	<div>
		<h1>hey, <br /> i'm <span>affan;</span></h1>
		<h4>Hobbyist illustrator and designer. <br />Attempting to program.</h4>
		<Button side={true} on:click={handleClick} on:keypress={handleClick}>
			<h3>Discover my work ↓</h3>
		</Button>
	</div>
	<HeroImage />
</section>

<style>
	section {
		scroll-margin-top: 20rem;
		display: flex;
		justify-content: space-between;
		margin-bottom: 5.75rem;
		margin-top: 7.25rem;
	}

	h4 {
		margin-top: 1rem;
		margin-bottom: 1.7rem;
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

		h3 {
			min-height: 0vw;
			font-size: clamp(1.1rem, 2vw, 1.9rem);
		}

		h4 {
			min-height: 0vw;
			font-size: clamp(1.4rem, 2.4vw, 1.7rem);
		}
		
	}

	@media screen and (max-width: 868px) {
		section {
			margin-top: 4rem;
		}
	}

	@media screen and (max-width: 768px) {
		section {
			margin-bottom: 2.75rem;
		}
	}

	@media screen and (max-width: 400px) {
		h4 br {
			content: '&#160;';
		}
	}
</style>
