<script>
	import HeroImage from '../../components/atoms/HeroImage.svelte';
	import Button from '../atoms/Button.svelte';
	import Socials from '../molecules/Socials.svelte';
	

	let text = 'affan;';

	function handleClick() {
		const el = document.querySelector('#aw');
		if (!el) return;
		el.scrollIntoView(true);
	}
</script>

<section id="home" class="wrapper">
	<div>
		<h1>
			afn
		</h1>
		<h4>Hobbyist illustrator and designer. <br />Attempting to program.</h4>
		<div class="socials">
			<Socials/>
		</div>
		<Button side={true} on:click={handleClick} on:keypress={handleClick}>Discover my work ↓</Button>
	</div>
	<HeroImage />
</section>

<style>
	section {
		scroll-margin-top: 20rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 5.75rem;
		margin-top: 7.25rem;
	}

	.socials {
		margin-top: 1rem;
		margin-bottom: 1.7rem;
	}

	h4 {
		margin-top: 1rem;
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

	@media screen and (max-width: 1240px) {
		h1 {
			min-height: 0vw;
			font-size: clamp(4rem, 10vw, 6.25rem);
		}

		h4 {
			min-height: 0vw;
			font-size: clamp(1.4rem, 2.4vw, 1.5rem);
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

	@media screen and (max-width: 500px) {
		section {
			display: block;
		}
	}

	@media screen and (max-width: 400px) {
		h4 br {
			content: '&#160;';
		}
	}
</style>
