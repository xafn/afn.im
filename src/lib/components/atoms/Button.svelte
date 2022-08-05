<script>
</script>

<div>
    <button>
        <h2>
            <slot/>
        </h2>
    </button>
</div>

<style>
    button {
		border-radius: 25px;
        border-color: transparent;
		padding: 1rem 2rem 1rem 2.5rem;
		cursor: pointer;
		background-color: var(--grey-one);
		font-size: 1.5rem;
		transition: padding 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		user-select: none;
        
    }

    h2 {
		color: var(--yellow);
    }

    button:hover {
		padding: 1.5rem 2.5rem 1.5rem 3rem;
	}

    button:active {
        transform: translateY(5%);
    }
</style>