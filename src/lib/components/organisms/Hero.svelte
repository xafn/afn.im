<script>
	import HeroTitle from '../atoms/HeroTitle.svelte';
	import HeroImage from '$lib/components/atoms/HeroImage.svelte';
	import Button from '../atoms/Button.svelte';
</script>

<section id="home" class="wrapper margin">
	<div>
		<HeroTitle />
		<h4>Hobbyist illustrator and designer. <br />Attempting to program.</h4>
		<Button>Discover my work ↓</Button>
	</div>
	<HeroImage />
</section>

<style>
	section {
		scroll-margin-top: 20rem;
		display: flex;
		justify-content: space-between;
		margin-bottom: 5.75rem;
	}
	h4 {
		margin-top: 1rem;
		margin-bottom: 1.7rem;
	}

	.margin {
		margin-top: 7.25rem;
	}

	@media screen and (max-width: 400px) {
		br {
			content: '&#160;';
		}
	}

	@media screen and (max-width: 768px) {
		section {
			margin-bottom: 2.75rem;
		}
	}

	@media screen and (max-width: 1240px) {
		h4 {
			min-height: 0vw;
			font-size: clamp(1.4rem, 2.4vw, 1.7rem);
		}
	}

	@media screen and (max-width: 868px) {
		:global(.margin) {
			margin-top: 4rem !important;
		}
	}
</style>
