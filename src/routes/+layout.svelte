<script lang="ts">
	import NavHost from '../components/molecules/NavHost.svelte';
	import { onMount } from 'svelte';
	import '../styles/global.css';

	let loading = true;

	onMount(() => {
		if (document.readyState === 'complete') {
			loading = false;
		}

		const classes = document.querySelector('body')?.classList;
		const stopResizeAnimation = () => {
			let timer: any = 0;
			window.addEventListener('resize', function () {
				if (timer) {
					clearTimeout(timer);
					timer = null;
				} else {
					classes?.add('stop-transitions');
				}

				timer = setTimeout(() => {
					classes?.remove('stop-transitions');
					timer = null;
				}, 100);
			});
		};

		stopResizeAnimation();
	});
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="og:title" content="afn.lol" />
	<meta content="/default.png" property="og:image" />
	<meta property="og:description" content="the only website ever" />
	<meta name="twitter:image" itemprop="image" content="/default.png" />
	<meta name="twitter:card" content="summary" />
	<meta name="theme-color" content="#CCE2F2" />
	<title>afn</title>
</svelte:head>

<span class:loading>
	<NavHost />
	<slot />
</span>

<style>
	.loading * {
		transition: none;
	}
</style>
