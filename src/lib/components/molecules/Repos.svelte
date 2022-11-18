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

<div class="title">
	<h2><span>code</span>:work</h2>
</div>
<div class="grid">
	{#if repos}
		{#each repos as repo}
			<a href={repo.link} target="_blank">
				<div class="repo-card">
					<div>
						<h5>{repo.repo}</h5>
						<h7>{repo.description}</h7>
						<br />
					</div>
					<div class="info-container">
						<div class="info">
							<span class="dot" style="background-color: {repo.languageColor}" />
							<h7>{repo.language}</h7>
						</div>
						<div class="info">
							{#if repo.stars}
								<img src="icons/star.svg" id="star" alt="star" />
								<h7>{repo.stars}</h7>
							{/if}
						</div>
						<div class="info">
							{#if repo.forks}
								<img src="icons/fork.svg" alt="fork" />
								<h7>{repo.forks}</h7>
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
		min-height: 100px;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		transition: border-radius 0.3s var(--bezier-one);
		justify-content: space-between;
	}

	.repo-card:hover {
		border-radius: 20px;
	}

	a {
		text-decoration: none;
		color: var(--white);
		height: 100%;
	}

	img {
		height: auto;
		width: 16px;
	}

	h2 {
		display: inline-block;
	}

	#star {
		transform: translateY(-1px);
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
		height: 10px;
		width: 10px;
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
		gap: 0.75rem;
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
