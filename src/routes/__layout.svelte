<svelte:head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
	<meta name="og:title" content="afn"/>
	<meta name="og:image" itemprop="image" content="/embed.png">
	<meta property="og:description" content="The only portfolio ever.">
	<meta name="twitter:image" itemprop="image" content="/embed.png">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="theme-color" content="#120e0e">
	<title>afn</title>
</svelte:head>

<script>
	import NavHost from "$lib/components/molecules/NavHost.svelte";
	import { onMount } from "svelte";

	onMount (() => {
		const classes = document.querySelector('body')?.classList || [];

		const stopResizeAnimation = () => { 
			/** @type {any}*/
			let timer = 0;
			window.addEventListener('resize', function () {
				if (timer) {
					clearTimeout(timer);
					timer = null;
				}
				else {
					classes.add('stop-transitions');
				}

				timer = setTimeout(() => {
					classes.remove('stop-transitions');
					timer = null;
				}, 100);
			});
		};

		stopResizeAnimation();
	})
	
</script>

<NavHost />
<slot />

<style>
	:global(*) {
		box-sizing: inherit;
		margin: 0;
		padding: 0;
		font-family: var(--font-one);

		scroll-behavior: smooth;
		scroll-margin-top: 6rem;

		-webkit-tap-highlight-color: rgba(0,0,0,0);
		
	}

	@media (max-width: 850px){
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
		margin-top: 7.75rem;

	}

	@media (max-width: 850px){
        :global(.wrapper) {
			margin-top: 4rem;
			margin-bottom: 4.75rem;
        }
    }

	:global(body.stop-transitions *){
		transition: none !important;
	}

	:root {
		--white: #eed1c7;
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
	}

	:global(h2) {
		color: var(--white);
		font-weight: 300;
		font-size: 1.6rem;
		font-family: var(--font-two);
		letter-spacing: -0.075em;
	}

	:global(h4) {
		color: var(--white);
		font-weight: 300;
		font-size: 1.7rem;
		letter-spacing: -0.05em;
	}

	:global(h5) {
		color: var(--white);
		font-weight: 500;
		font-size: 3rem;
		letter-spacing: -0.05em;
		background-color: var(--grey-one);
		border-radius: 20px;
		padding: 0.4rem 2.5rem;
		width:fit-content;
	}

	@media (max-width: 850px){
        :global(h5) {
            display: block;
			padding: 0;
			background-color: transparent;
			font-size: 1.75rem;
        }
    }

	
	:global(h6) {
		color: var(--white);
		font-weight: 300;
		font-size: 1.1rem;
		letter-spacing: -0.04em;
	}

	@media (max-width: 850px) {
		:global(h6) {
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