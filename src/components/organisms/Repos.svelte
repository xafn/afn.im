<script lang="ts">
	import { onMount } from 'svelte';
	import type { Repo } from '../../util/types';

	let repos: Repo[];

	onMount(async () => {
		const response = await fetch('https://gh-pinned.nxl.sh/api/user/xafn');
		repos = await response.json();
	});
</script>

<div class="wrapper">
	<div class="title">
		<h2><span>code</span>:work</h2>
	</div>
	<div class="grid">
		{#if repos}
			{#each repos as { link, owner, repo, description, languageColor, language, stars, forks }}
				<a href={link} target="_blank" rel="noreferrer">
					<div class="repo-card">
						<div id="top-part">
							<div class="info">
								<img
									src="https://github.com/{owner}.png"
									alt="{owner}'s profile picture"
									id="pfp"
								/>
								<h7>{owner}</h7>
							</div>
							<div>
								<img src="icons/open.svg" alt="open in new tab" id="open" />
							</div>
						</div>
						<div>
							<h5>{repo}</h5>
							<h7>{description}</h7>
							<br />
						</div>
						<div class="info-container">
							<div class="info">
								<span class="dot" style="background-color: {languageColor}" />
								<h7>{language}</h7>
							</div>
							<div class="info">
								{#if stars}
									<img src="icons/star.svg" id="star" alt="star" />
									<h7>{stars}</h7>
								{/if}
							</div>
							<div class="info">
								{#if forks}
									<img src="icons/fork.svg" alt="fork" />
									<h7>{forks}</h7>
								{/if}
							</div>
						</div>
					</div>
				</a>
			{/each}
		{:else}
			<div class="repo-card" />
			<div class="repo-card" />
		{/if}
	</div>
</div>

<style>
	.title {
		display: flex;
		justify-content: center;
		margin-top: 0;
	}
	.repo-card {
		padding: 1rem 1.25rem;
		background-color: var(--neutral-two);
		border-radius: 8px;
		min-height: 140px;
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		transition: transform 0.3s var(--bezier-one), box-shadow 0.3s var(--bezier-one);
		justify-content: space-between;
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
		background-blend-mode: overlay;
		border: 1px solid var(--neutral-four);
	}

	.repo-card:hover {
		transform: translateY(-2px);
		box-shadow: 0px 15px 25px -10px rgba(0, 0, 0, 0.25);
	}

	.repo-card:hover #open {
		filter: brightness(1.3);
	}

	a {
		text-decoration: none;
		color: var(--white);
		height: 100%;
	}

	img {
		height: 14px;
		width: auto;
	}

	h2 {
		display: inline-block;
	}

	#star {
		transform: translateY(-1px);
	}

	#pfp {
		border-radius: 50%;
		height: 16px;
	}

	#top-part {
		display: flex;
		justify-content: space-between;
	}

	#open {
		height: 20px;
		transition: filter 0.3s var(--bezier-one);
	}

	span {
		color: var(--yellow);
	}

	.grid {
		gap: 0.8rem;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		display: grid;
		grid-template-columns: 1fr 1fr;
		margin-bottom: 5rem;
		position: relative;
	}

	.grid:before {
		height: 300px;
		font-size: 175px;
		content: 'λ';
		font-weight: 700;
		z-index: -1;
		user-select: none;
		transform: translateY(-20%) translateX(1175%);
		-webkit-text-stroke: 2px var(--white);
		color: transparent;
		opacity: 0.25;
		letter-spacing: -0.075em;
		position: absolute;
	}

	.dot {
		height: 11px;
		width: 11px;
		border-radius: 50%;
		display: inline-block;
	}

	.info {
		display: flex;
		gap: 0.2rem;
		align-items: center;
	}

	.info-container {
		display: flex;
		gap: 0.9rem;
	}

	@media (max-width: 868px) {
		.title {
			justify-content: left;
		}

		.grid {
			margin-bottom: 2rem;
		}
	}

	@media (max-width: 600px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
