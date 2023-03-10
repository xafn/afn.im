<script lang="ts">
	import { onMount } from 'svelte';
	import '../styles/global.scss';
	import '../styles/fonts.css';
	import Cursor from '../components/atoms/Cursor.svelte';

	let loading = true;

	// bruh why is audio so weird
	const clickSFX = typeof Audio !== 'undefined' ? new Audio('sounds/click.ogg') : undefined;
	function clickSoundEffect() {
		clickSFX?.play();
	}

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
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="og:title" content="afn.lol" />
	<meta content="/default.png" property="og:image" />
	<meta property="og:description" content="the only website ever" />
	<meta name="twitter:image" itemprop="image" content="/default.png" />
	<meta name="twitter:card" content="summary" />
	<meta name="theme-color" content="#CCE2F2" />
	<title>afn</title>
</svelte:head>

<svelte:window on:click={clickSoundEffect} />

<Cursor />
<span class:loading>
	<slot />
</span>

<style>
	.loading * {
		transition: none;
	}
</style>
