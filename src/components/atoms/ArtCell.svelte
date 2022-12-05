<script>
	import { fly } from 'svelte/transition';
	import { cubicOut, quintOut } from 'svelte/easing';

	export let tall = false;
	export let shrink = false;
	export let art = 'HeroImage';

	import { onMount } from 'svelte';

	let clicked = false;

	onMount(() => {
		document.addEventListener('keydown', function (event) {
			if (event.key === 'Escape') {
				clicked = false;
			}
		});
	});
</script>

<!-- shut up im right -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
	class="card"
	class:tall
	class:shrink
	style="background-image:url(art/{art}.webp)"
	loading="eager"
	tabindex="0"
	on:click={() => (clicked = true)}
	on:keypress={() => (clicked = true)}
/>

<svelte:head>
	{#if clicked}
		<title>afn | {art}</title>
	{:else}
		<title>afn</title>
	{/if}
</svelte:head>

{#if clicked === true}
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<div
		class="img-contain"
		tabindex="0"
		on:click={() => (clicked = false)}
		on:keypress={() => (clicked = false)}
		in:fly={{ y: 50, easing: quintOut, duration: 750 }}
		out:fly={{ y: 50, easing: cubicOut, duration: 300 }}
	>
		<h4>{art}</h4>
		<img src="art/{art}.webp" alt={art} />
		<h7>Click anywhere to dismiss</h7>
	</div>
{/if}

<style>
	.card {
		height: 100%;
		width: 100%;
		border-radius: 4px;
		overflow: hidden;
		background: var(--grey-one);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		transition: transform 0.3s var(--bezier-one), box-shadow 0.3s var(--bezier-one);
		cursor: pointer;
		font-size: 0;
		user-select: none;
	}

	.card:hover {
		transform: translateY(-1px);
		box-shadow: 0px 15px 25px -10px rgba(0, 0, 0, 0.25);
	}

	.tall {
		grid-row: span 2 / auto;
	}

	img {
		max-height: 83vh;
		height: auto;
		max-width: 86vw;
		border-radius: 2vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.img-contain {
		background-blend-mode: overlay;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: fixed;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		height: 200vh;
		width: 100vw;
		z-index: 9999999;
		cursor: pointer;
		user-select: none;
		background-color: #0a0808bb;
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
	}

	h4,
	h7 {
		margin: 1vh;
	}

	h7 {
		font-size: 2vh;
		margin-top: 2vh;
	}

	h4 {
		font-size: 3.5vh;
		font-weight: 500;
		color: var(--white);
	}

	@media only screen and (max-width: 1164px) {
		.shrink {
			grid-row: span 1 / auto;
		}
	}

	@media screen and (max-width: 868px) {
		.card {
			border-radius: 0;
		}
	}
</style>
