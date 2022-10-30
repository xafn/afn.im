<script lang="ts">
	export let href = '#';
	export let section = 'home';
	export let isSelected: boolean;

	function handleClick() {
		const el = document.querySelector(href);
		if (!el) return;
		el.scrollIntoView(true);
	}
</script>

<div 
	class="nav-container" 
	class:selected={isSelected}
	oncontextmenu="return false;" 
	on:click={handleClick}
>
	<img src="icons/{section}.svg" alt={section} />
	<div class="text">
		{section}
	</div>
</div>

<style>
	.text {
		text-align: center;
		list-style: none;
		display: inline-block;
		position: relative;
		align-items: center;
		border: var(--grey-six);
		font-family: var(--font-two);
		transition: all 0.3s var(--bezier-one);
	}

	.nav-container {
		color: var(--white-two);
		text-decoration: none;
		font-size: 1.1rem;
		user-select: none;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 13px 25px;
		border-radius: 100px;
		user-select: none;
		cursor: pointer;

		transition: background-color 0.3s var(--bezier-one), transform 0.3s var(--bezier-one);
	}

	.nav-container:hover {
		background-color: var(--grey-two);
	}

	.selected {
		color: var(--white)
	}

	.selected img {
		opacity: 1;
	}

	img {
		margin-right: 0.75rem;
		opacity: 0.5;
		transition: all 0.5s var(--bezier-one);
	}



	div:active img, div:hover img {
		opacity: 1;
	}

	@media screen and (max-width: 868px) {
		img {
			transform: scale(0.95);
			margin-right: 0;
			margin-bottom: 0.2rem;
			border-radius: 100px;
			padding: 6px 24px;
			transition-delay: 0.3s;
		}

		.text {
			transition-delay: 0.5s;
		}

		.nav-container {
			flex-direction: column;
			font-size: 0.9rem;
			margin-bottom: 0;
		}

		.nav-container:hover {
			background-color: transparent;
		}

		.nav-container:hover > img, .selected > img {
			background-color: var(--yellow-opacity);
		}

	}
</style>
