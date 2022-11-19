<script lang="ts">
	import { onMount } from 'svelte';

	// wow an interface are you proud of me
	interface Repo {
		owner: string;
		repo: string;
		link: string;
		description: string;
		image: string;
		website: string;
		language: string;
		languageColor: string;
		stars: string;
		forks: any;
	}

	let repos: Repo[];

	onMount(async () => {
		const response = await fetch('https://gh-pinned-repos.egoist.dev/?username=xafn');
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
						<div class="info">
							<img src="https://github.com/{owner}.png" alt="{owner}'s profile picture" id="pfp" />
							<h7>{owner}</h7>
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
		background-color: var(--grey-two);
		border-radius: 8px;
		min-height: 135px;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		transition: transform 0.3s var(--bezier-one);
		justify-content: space-between;
	}

	.repo-card:hover {
		transform: translateY(-2px);
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
