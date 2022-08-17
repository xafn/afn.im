<script>
    function handleClick() {
        const el = document.querySelector('#aw');
		if (!el) return;
        el.scrollIntoView(true);
    };
</script>

<div>
    <button on:click={ handleClick }>
        <span class="side"></span>
        <h2>
            <slot/>
        </h2>
    </button>
</div>

<style>

    button {
		border-radius: 25px;
        border-color: transparent;
		padding: 1rem 2rem;
		cursor: pointer;
		background-color: var(--grey-one);
		font-size: 1.5rem;
		transition: padding 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		user-select: none;
        border-left: 20px solid var(--yellow);
        margin: 0 0 0 0;   
    }

    h2 {
		color: var(--yellow);
    }

    button:hover {
		padding: 1.5rem 2.5rem;
	}

    button:active {
        transform: translateY(5%);
    }

    @media screen and (max-width: 1240px) {
		h2 {
			font-size:clamp(1.25rem, 5vw, 1.5rem)
		}
	}

    @media (hover: none) {
        button:hover {
            padding: 1rem 2rem;
        }
    }
    
</style>