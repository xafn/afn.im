<script>
    export let href = "#";
	export let section = "home";

	function handleClick() {
		const el = document.querySelector(href);
		if (!el) return;
		el.scrollIntoView(true);
	}

</script>

<div class='nav-container' oncontextmenu="return false;" on:click={handleClick}>
	<img src="icons/{section}.svg" alt="{section}"/>
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
        
		transition: background-color 0.3s var(--bezier-one);
	}

	.nav-container {
		color: var(--white);
		text-decoration: none;
		font-size: 1.1rem;
		user-select: none;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 100px;
		padding: 13px 25px;
        user-select: none;
		cursor: pointer;

		-webkit-tap-highlight-color: #211c1c46;
		transition: background-color 0.3s var(--bezier-one), transform 0.3s var(--bezier-one);	
	}

	.nav-container:hover {
		background-color: var(--yellow-opacity);
	}

	.nav-container:active {
		transform: scale(95%);
	}

	/* li.selected	 {
		font-weight: 600;
		border: 3px solid var(--red);
		border-radius: 200px;
	} */

	img {
		margin-right: 0.75rem;
		transition: opacity 0.3s var(--bezier-one);	
	}

	@media screen and (max-width: 868px) {
		img {
			transform: scale(0.95);
			margin-right: 0;
			margin-bottom: 0.2rem;
			border-radius: 100px;
			padding: 6px 24px;
		}

		.nav-container {
			flex-direction: column;
			font-size:0.9rem;
			margin-bottom: 0;
		}

		.nav-container:hover {
			background-color: transparent;
		}

		.nav-container:hover > img {
			transition: background-color 0.3s var(--bezier-one);
			background-color: var(--yellow-opacity);
		}

		div:active {
		transform: none;
		}

	}
</style>