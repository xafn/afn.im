<script>
    export let href = "#";
	export let icon = "home";
</script>

<div oncontextmenu="return false;">
	<a href={href} >
		<img src="navbar/{icon}.svg" alt="{icon}"/>
		<li>
		    <slot/>
		</li>
	</a>
</div>

<style>
	li {
		text-align: center;
		list-style: none;
		display: inline-block;
		position: relative;
		align-items: center;
		border: var(--grey-six);
        font-family: var(--font-two);
        
		transition: background-color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}

	a {
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

		-webkit-tap-highlight-color: #211c1c46;
		
	}

	a:hover {
		background-color: var(--grey-one);
	}

	li.selected	 {
		font-weight: 600;
		border: 3px solid var(--red);
		border-radius: 200px;
	}

	img {
		margin-right: 0.75rem;
	}

	@media screen and (max-width: 850px) {
		img {
			transform: scale(0.95);
			margin-right: 0;
			margin-bottom: 0.2rem;
			border-radius: 100px;
			padding: 7px 27px;
		}

		a {
			flex-direction: column;
			font-size:0.9rem;
			margin-bottom: 0.2rem;
		}

		a:hover {
			background-color: transparent;
		}

		a:hover > img {
			background-color: var(--yellow-opacity);
			
		}
	}
</style>