<script>
	import { fly } from 'svelte/transition';
	import { cubicOut, quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	export let type = '';
	export let art = 'HeroImage';
	export let name = '';
	export let shrink = '';

	let clicked = false;
</script>

<div
	class="card {type} {shrink}"
	style="background-image:url(art/{art}.webp)"
	on:click={() => (clicked = true)}
>
	{name}
</div>

<svelte:head>
	{#if clicked}
		<title>afn | {name}</title>
	{:else}
		<title>afn</title>
	{/if}
</svelte:head>

{#if clicked === true}
	<div
		class="img-contain"
		on:click={() => (clicked = false)}
		in:fly={{ y: 50, easing: quintOut, duration: 750 }}
		out:fly={{ y: 50, easing: cubicOut, duration: 300 }}
	>
		<h4>{name}</h4>
		<img src="art/{art}.webp" alt={name} />
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
		transform: translateY(-0.5%);
		box-shadow: 0 0 2rem #c0997f16;
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
		z-index: 1000;
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
