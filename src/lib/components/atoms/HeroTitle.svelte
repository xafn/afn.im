<script>
	
</script>

<div>
    <h1>
        hey, <br/>	<span class="im">i'm</span> <span class="second">affan;</span>
    </h1>
	
</div>

<style>
	div {
		display: inline-block;
	}

	h1 {
		line-height: 0.05rem;
		line-height: 101.6%;
		font-size: calc(100% + 6rem);
	}

	h1::before {
		height:175px;
        font-size: 175px;
        content:'///';
        font-weight:800;
        z-index: -1;
        user-select: none;
		transform: translateX(-95%);
        -webkit-text-stroke: 2px var(--white);
        color:transparent;
        opacity:0.25;
        letter-spacing: -0.1em;
        
        position: absolute;
	}

	.second {
		color: var(--yellow);
		font-weight: 600;
		font-size: 4.6rem;
		font-family: var(--font-two);
		letter-spacing: -0.075em;
		background-color: var(--grey-one);
		border-radius: 2.25rem;
		padding: 0.4rem 2rem 0.3rem;
		transform: translateY(-4%);
	}

</style>