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
			<img src="icons/{section === '/' ? 'home' : section}.svg" alt={section} />
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
		color: var(--white-two);
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
			background-color: var(--neutral-four);
		}
	}


	h5 {
		transition: all 0.3s var(--bezier-one);
	}

	.icon-container {
		display: none;
	}

	button:hover > h5,
	.selected img,
	.selected h5 {
		color: var(--white);
		opacity: 1;
	}

	img {
		display: flex;
		align-items: center;
		justify-self: center;
		opacity: 0.5;
		height: 24px;
		width: 24px;
		transition: all 0.5s var(--bezier-one);
	}

	h5 {
		opacity: 0.8;
	}

	button:active img,
	button:hover img {
		opacity: 1;
	}

	@media screen and (max-width: 868px) {
		img {
			transform: scale(0.95);
			margin-right: 0;
			transition-delay: 0.3s;
		}

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
			background-color: var(--yellow-opacity);
		}
	}
</style>
