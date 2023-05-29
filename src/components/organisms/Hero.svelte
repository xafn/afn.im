<script>
	import HeroImage from '../../components/atoms/HeroImage.svelte';
	import Button from '../atoms/Button.svelte';
	import Socials from '../molecules/Socials.svelte';

	function handleClick() {
		const el = document.querySelector('#aw');
		if (!el) return;
		el.scrollIntoView(true);
	}
</script>

<section id="home" class="wrapper">
	<div>
		<div class="title">
			<div id="mobile-hero-image"><HeroImage /></div>
			<h1>afn</h1>
		</div>
		<h4>Hobbyist illustrator and designer. <br />Attempting to program.</h4>
		<div class="socials">
			<Socials />
		</div>
		<Button side on:click={handleClick} on:keypress={handleClick}>Discover my work ↓</Button>
	</div>
	<div id="desktop-hero-image"><HeroImage /></div>
</section>

<style lang="scss">
	@import '../../styles/mixins.scss';

	section {
		scroll-margin-top: 20rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 5.75rem;
		margin-top: 7rem;

		@media screen and (max-width: 868px) {
			margin-top: 4rem;
		}

		@media screen and (max-width: 768px) {
			margin-bottom: 2.75rem;
		}

		@media screen and (max-width: 500px) {
			display: block;
		}
	}

	.title {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	@media screen and (min-width: 768px) {
		#mobile-hero-image {
			display: none;
		}
	}

	@media screen and (max-width: 768px) {
		#desktop-hero-image {
			display: none;
		}
	}

	.socials {
		margin-top: 1rem;
		margin-bottom: 1.7rem;
	}

	h4 {
		margin-top: 1rem;
	}

	h1::before {
		@include outlineText($content: '///', $translateX: -95%, $letterSpacing: -0.1em);

		@media screen and (max-width: 768px) {
			@include outlineText($content: '///', $translateX: -175%, $letterSpacing: -0.1em);
		}
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

	@media screen and (max-width: 400px) {
		h4 br {
			content: '&#160;';
		}
	}
</style>
