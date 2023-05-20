<script lang="ts">
	import NavHost from '../components/molecules/NavHost.svelte';
	import Hero from '../components/organisms/Hero.svelte';
	import About from '../components/organisms/About.svelte';
	import Art from '../components/organisms/Art.svelte';
	import Repos from '../components/organisms/Repos.svelte';
	import Supporters from '../components/organisms/Supporters.svelte';
	import Footer from '../components/molecules/Footer.svelte';

	import type { PageData } from './$types';
	export let data: PageData;
</script>

<NavHost />
<main>
	<Hero />
	<About />
	<Art />
	<Repos repos={data.repos} />
	<Supporters />
	<Footer />
</main>
