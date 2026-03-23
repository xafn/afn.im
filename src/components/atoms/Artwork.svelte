<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicOut, quintOut } from 'svelte/easing';

	export let name = '';
	export let tall = false;
	export let position = 'center';
	export let commission = false;
	export let subtitle = 'Click anywhere to dismiss';

	let clicked = false;
	let artworkAudioCtx: AudioContext | null = null;

	function playArtworkSFX(src: string, volume: number) {
		const audio = new Audio(src);

		if (typeof window !== 'undefined' && 'AudioContext' in window) {
			artworkAudioCtx ??= new window.AudioContext();
			const source = artworkAudioCtx.createMediaElementSource(audio);
			const gainNode = artworkAudioCtx.createGain();
			gainNode.gain.value = volume;
			source.connect(gainNode);
			gainNode.connect(artworkAudioCtx.destination);
			void artworkAudioCtx.resume();
		} else {
			audio.volume = Math.min(volume, 1);
		}

		void audio.play().catch(() => {
			const fallback = new Audio('/sounds/click.ogg');
			fallback.volume = 1;
			void fallback.play().catch(() => null);
		});
	}

	function openArtwork() {
		clicked = true;
		playArtworkSFX('/sounds/paper.mp3', 1.25);
	}

	function closeArtwork() {
		clicked = false;
		playArtworkSFX('/sounds/crumple.mp3', 1.25);
	}

	function onKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			closeArtwork();
		}
	}

	function disableRightClick(event: { preventDefault: () => void }) {
		if (commission) {
			event.preventDefault();
		}
	}
</script>

<button
	class="card"
	class:tall
	style="background-position: {position}; background-image:url(art/{name}.webp);"
	aria-label={name}
	on:click|stopPropagation={openArtwork}
	on:keypress|stopPropagation={openArtwork}
/>

<svelte:window on:keydown={onKeyDown} />

<svelte:head>
	{#if clicked}
		<title>afn · {name}</title>
	{:else}
		<title>afn</title>
	{/if}
</svelte:head>

{#if clicked === true}
	<div
		class="img-modal"
		tabindex="0"
		on:click|stopPropagation={closeArtwork}
		on:keypress|stopPropagation={closeArtwork}
		on:contextmenu={disableRightClick}
		role="button"
		in:fly={{ y: 50, easing: quintOut, duration: 750 }}
		out:fly={{ y: 50, easing: cubicOut, duration: 300 }}
	>
		<h3>{name}</h3>
		<img src="art/{name}.webp" alt={name} />
		<h6>{subtitle}</h6>
	</div>
{/if}

<style lang="scss">
	.card {
		position: relative;
		border: none;
		padding: none;
		height: 100%;
		width: 100%;
		border-radius: 4px;
		overflow: hidden;
		background: var(--elevation-one);
		transition: all 0.3s var(--bezier-one);
		cursor: pointer;
		font-size: 0;
		user-select: none;
		background-size: cover;
		background-repeat: no-repeat;
		-webkit-transform: translate3d(0, 0, 1px);
		transform: translate3d(0, 0, 1px);
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;

		&:hover {
			transform: translateY(-1px);
			box-shadow: 0px 15px 25px -10px rgba(0, 0, 0, 0.25);
		}

		@media screen and (max-width: 868px) {
			border-radius: 0;
		}
	}

	.img-modal {
		background-blend-mode: overlay;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: fixed;
		text-align: center;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		height: 100vh;
		width: 100vw;
		z-index: 20;
		cursor: pointer;
		user-select: none;
		background-color: var(--elevation-six);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);

		img {
			max-height: 83vh;
			height: auto;
			max-width: 86vw;
			border-radius: 2vh;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	h3,
	h6 {
		margin: 1vh;
	}

	h6 {
		font-size: 2vh;
		margin-top: 2vh;
	}

	h3 {
		font-size: 3.5vh;
		font-weight: 500;
		color: var(--text-primary);
	}

	@media (prefers-color-scheme: light) {
		h3 {
			color: var(--art-modal-light-font-primary);
		}
		h6 {
			color: var(--art-modal-light-font-secondary);
		}
	}

	.tall {
		grid-row: span 2 / auto;
	}
</style>
