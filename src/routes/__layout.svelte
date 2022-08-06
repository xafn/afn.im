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
    <meta name="theme-color" content="#0f111a">
	<title>afn</title>
	<link rel="stylesheet" href="css/styles.css" />
</svelte:head>

<script>
	import NavHost from "$lib/components/molecules/NavHost.svelte";
</script>

<NavHost />
<slot />

<style>
	:global(*) {
		box-sizing: inherit;
		margin: 0;
		padding: 0;
		font-family: 'Space Grotesk', sans-serif;
	}

	:global(html) {
		font-size: 100%;
		box-sizing: border-box;
		letter-spacing: -0.05em;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		line-height: 1.3;
		background-color: var(--bg-color);
		overflow: overlay;
		overflow-x: hidden;
	}

	:global(html, body) {
		max-width: 100%;
	}

	:global(.wrapper) {
		margin-inline: auto;
		width: min(90%, 70rem);
		margin-top:6.75rem;
	}

	:root {
		--white: #eed1c7;
		--yellow: #dba895;
		--yellow-opacity: #dba89525;
		--bg-color: #120e0e;
		--grey-one: #211c1c;
		--grey-two: #211c1c75;
		--grey-three: #1e1a1a;
		--font-one: 'Space Grotesk', sans-serif;
		--font-two: 'JetBrains Mono', mono space;
	}

	:global(::selection) {
		color: var(--white);
		background: var(--yellow-opacity);
	}

	/*-----headings-----*/

	:global(h1) {
		color: var(--white);
		font-weight: 700;
		letter-spacing: -0.075em;
		font-size: 7.5rem;
	}

	:global(h2) {
		color: var(--white);
		font-weight: 300;
		font-size: 1.85rem;
		font-family: 'JetBrains Mono', mono space;
		letter-spacing: -0.075em;
	}

	:global(h4) {
		color: var(--white);
		font-weight: 300;
		font-size: 1.85rem;
		letter-spacing: -0.05em;
	}

	:global(h6) {
		color: var(--white);
		font-weight: 300;
		font-size: 1.25rem;
		letter-spacing: -0.05em;
	}

	/*-----scrollbar-----*/

	:global(::-webkit-scrollbar) {
		width: 2vw;
		background-color: transparent;
	}

	:global(::-webkit-scrollbar-thumb) {
		background-color: var(--grey-three);
		border-radius: 20px;
		border: 0.6vw solid transparent;
		background-clip: content-box;
	}

	:global(::-webkit-scrollbar-thumb:hover) {
		background-color: var(--grey-one);
	}
</style>