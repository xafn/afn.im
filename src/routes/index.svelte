<script>
	import Hero from '$lib/components/organisms/Hero.svelte';
	import About from '$lib/components/organisms/About.svelte';
	import Work from '$lib/components/organisms/Work.svelte';
	import Footer from '$lib/components/molecules/Footer.svelte';
</script>

<div class="wrapper margin">
	<Hero />
	<About />
</div>
<Work />

<Footer />

<style>
	.margin {
		margin-top: 7.25rem;
	}

	@media screen and (max-width: 868px) {
		:global(.margin) {
			margin-top: 4rem !important;
		}
	}
</style>
