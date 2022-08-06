<script>
    export let href = "#"
</script>

<a href={href}>
	<li>
	    <slot/>
	</li>
</a>

<style>
	li {
		text-align: center;
		list-style: none;
		display: inline-block;
		position: relative;
		align-items: center;
		border: var(--grey-six);
        font-family: var(--font-two);
        border-radius: 100px;
		padding: 7px 20px;
        user-select: none;
		transition: background-color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}

	a {
		color: var(--white);
		text-decoration: none;
		font-size: 1.1rem;
		user-select: none;
		
	}

	li:hover {
		background-color: var(--grey-two);
	}

	li.selected	 {
		font-weight: 600;
		border: 3px solid var(--red);
		border-radius: 200px;
	}
</style>