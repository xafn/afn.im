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

<li
	class:selected={isSelected}
	oncontextmenu="return false;"
	on:click={handleClick}
>
	<div class="icon-container">
		<img src="icons/{section}.svg" alt={section} />
	</div>
	<h6 class="text">
		{section}
	</h6>
</li>

<style>
	.text {
		text-align: center;
		list-style: none;
		position: relative;
		align-items: center;
		border: var(--grey-six);
		font-family: var(--font-two);
		transition: all 0.3s var(--bezier-one);
	}

	li {
		color: var(--white-two);
		text-decoration: none;
		font-size: 1.1rem;
		user-select: none;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 13px 25px;
		border-radius: 100px;
		cursor: pointer;
		transition: background-color 0.3s var(--bezier-one), transform 0.3s var(--bezier-one);
	}

	li:hover {
		background-color: var(--grey-two);
	}

	li:hover > .text {
		color: var(--white);
	}

	.selected {
		color: var(--white);
	}

	.selected img {
		opacity: 1;
	}

	.selected h6 {
		color: var(--white);
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

	li:active img,
	li:hover img {
		opacity: 1;
	}

	@media screen and (max-width: 868px) {
		img {
			transform: scale(0.95);
			margin-right: 0;
			transition-delay: 0.3s;
		}

		.text {
			transition-delay: 0.5s;
		}

		.icon-container {
			padding: 6px 24px;
			border-radius: 100px;
			margin-bottom: 0.4rem;
			transition: all 0.5s var(--bezier-one);
			transition-delay: 0.3s;
		}

		li {
			flex-direction: column;
			gap: 0;
			font-size: 0.9rem;
			margin-bottom: 0;
		}

		li:hover {
			background-color: transparent;
		}

		li:hover > .icon-container,
		.selected > .icon-container {
			background-color: var(--yellow-opacity);
		}
	}
</style>
