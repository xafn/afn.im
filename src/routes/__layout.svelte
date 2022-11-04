<script lang="ts">
	import NavHost from '$lib/components/molecules/NavHost.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
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

<NavHost />
<slot />

<style>
	@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600&family=Space+Grotesk:wght@300;500;600;700&display=swap');

	:global(*) {
		box-sizing: inherit;
		margin: 0;
		padding: 0;
		font-family: var(--font-one);
		scroll-behavior: smooth;
		scroll-margin-top: 6rem;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}

	@media (max-width: 868px) {
		:global(*) {
			scroll-margin-top: 1rem;
		}
	}

	:global(html) {
		font-size: 100%;
		box-sizing: border-box;
		letter-spacing: -0.05em;
		overflow-x: hidden;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		line-height: 1.4;
		background-color: var(--bg-color);
		overflow-x: hidden;
	}

	:global(html, body) {
		max-width: 100%;
	}

	:global(.wrapper) {
		min-height: 0vw;
		margin-inline: auto;
		width: min(90%, 65rem) !important;
	}

	@media (max-width: 868px) {
		:global(.wrapper) {
			margin-bottom: 4.75rem;
		}
	}

	@media (max-width: 768px) {
		:global(.wrapper) {
			width: min(88%, 65rem) !important;
		}
	}

	:global(body.stop-transitions *) {
		transition: none !important;
	}

	:root {
		--white: #eed1c7;
		--white-two: hsl(0, 17%, 69%);
		--yellow: #dba895;
		--yellow-opacity: #dba8952a;
		--bg-color: #120e0e;
		--grey-one: #211c1c;
		--grey-two: #211c1c75;
		--grey-three: #1e1a1a;
		--font-one: 'Space Grotesk', sans-serif;
		--font-two: 'JetBrains Mono', mono space;
		--bezier-one: cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}

	:global(::selection) {
		color: var(--white);
		background: var(--yellow-opacity);
	}

	/*-----headings-----*/

	:global(h1) {
		color: var(--white);
		font-weight: 600;
		letter-spacing: -0.075em;
		font-size: 7.5rem;
		line-height: 0.05rem;
		line-height: 101.6%;
		font-size: 6.25rem;
	}

	:global(h2) {
		color: var(--white);
		font-weight: 500;
		font-size: 3rem;
		background-color: var(--grey-one);
		border-radius: 20px;
		padding: 0.4rem 2.5rem;
		width: fit-content;
		display: none;
	}

	:global(h3) {
		color: var(--yellow);
		font-weight: 300;
		font-size: 1.6rem;
		font-family: var(--font-two);
		letter-spacing: -0.075em;
	}
	:global(h4) {
		color: var(--white-two);
		font-weight: 300;
		font-size: 1.7rem;
	}

	:global(h5) {
		color: var(--white);
		font-weight: 500;
		font-size: 1.4rem;
	}


	:global(h6) {
		color: var(--white-two);
		font-size: 1.15rem;
		font-family: var(--font-two);
		font-weight: 300;
		letter-spacing: -0.075em;
	}
	:global(h7) {
		color: var(--white-two);
		font-size: 0.9rem;
		font-family: var(--font-two);
		font-weight: 300;
		letter-spacing: -0.075em;
	}

	:global(p) {
		color: var(--white-two);
		font-weight: 300;
		font-size: 1.1rem;
		letter-spacing: -0rem;
	}

	@media (max-width: 868px) {
		:global(h2) {
			display: block;
			padding: 0;
			background-color: transparent;
			font-size: 1.75rem;
			margin-bottom: 0.3rem;
			display: inline-block;
		}

		:global(h5) {
			font-size: 1.2rem;
		}
		:global(h6) {
			font-size: 1rem;
		}

		:global(p) {
			font-size: 1rem;
		}
	}

	/*-----scrollbar-----*/

	:global(::-webkit-scrollbar) {
		width: 11px;
		background-color: transparent;
	}

	:global(::-webkit-scrollbar-thumb) {
		background-color: var(--grey-three);
		background-clip: content-box;
	}

	:global(::-webkit-scrollbar-thumb:hover) {
		background-color: var(--grey-one);
	}
</style>
