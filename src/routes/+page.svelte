<script>
	import NavHost from '../components/molecules/NavHost.svelte';
	import Hero from '../components/organisms/Hero.svelte';
	import About from '../components/organisms/About.svelte';
	import Art from '../components/organisms/Art.svelte';
	import Projects from '../components/organisms/Projects.svelte';
	import Repos from '../components/organisms/Repos.svelte';
	import Footer from '../components/molecules/Footer.svelte';
</script>

<NavHost />
<main>
	<Hero />
	<About />
	<Projects />
	<Art />
	<Repos />
	<Footer />
</main>
