<script lang="ts">
	export let href = '#';
	export let section = 'home';
	export let isSelected: boolean;

	import { page } from '$app/stores';
	let currentPage = $page.url.pathname;

	async function handleClick() {
		if (currentPage !== '/') {
			window.location.href = '/';
		}

		const el = document.querySelector(href);
		if (!el) return;
		el.scrollIntoView(true);
	}
</script>

<li class:selected={isSelected}>
	<button on:click={handleClick}>
		<div class="icon-container">
			<slot/>
		</div>
		<h5>
			{section}
		</h5>
	</button>
</li>

<style lang="scss">
	li {
		text-decoration: none;
		list-style: none;
	}

	button {
		background-color: transparent;
		border: none;
		color: var(--text-secondary);
		font-size: 1.1rem;
		user-select: none;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 13px 25px;
		border-radius: 100px;
		cursor: pointer;
		transition: background-color 0.3s var(--bezier-one), transform 0.3s var(--bezier-one);

		&:hover {
			background-color: var(--elevation-four);
		}
	}

	h5 {
		transition: all 0.3s var(--bezier-one);
	}

	.icon-container {
		display: none;
	}

	button:hover > h5,
	.selected h5 {
		color: var(--text-primary);
		opacity: 1;
	}


	h5 {
		opacity: 0.8;
	}

	@media screen and (max-width: 868px) {

		h5 {
			transition-delay: 0.5s;
		}

		.icon-container {
			display: block;
			padding: 6px 24px;
			border-radius: 100px;
			margin-bottom: 0.4rem;
			transition: all 0.5s var(--bezier-one);
			transition-delay: 0.3s;
		}

		button {
			flex-direction: column;
			gap: 0;
			font-size: 0.9rem;
			margin-bottom: 0;
		}

		button:hover {
			background-color: transparent;
		}

		button:hover .icon-container,
		.selected .icon-container {
			background-color: var(--accent-opacity);
		}
	}
</style>
