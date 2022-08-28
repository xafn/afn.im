<script>
    function handleClick() {
        const el = document.querySelector('#aw');
		if (!el) return;
        el.scrollIntoView(true);
    };
</script>

<div>
    <button on:click={ handleClick }>
        <div class="rect"></div>
        <span class="side"></span>
        <h2>
            <slot/>
        </h2>
    </button>
</div>

<style>

    div {
        transition: 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .rect {
        position:absolute;
        background-color: var(--yellow);
        width:1.6rem;
        height:100%;
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
        top:0;
        left:0;
        transition: 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        z-index: 0;
    }

    button {
		border-radius: 25px;
        border-color: transparent;
		padding: 1rem 2rem 1rem 3rem;
		cursor: pointer;
		background-color: var(--grey-one);
        transition: padding 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        user-select: none;
        margin: 0;   
    }

    h2 {
        transition: 0.3s ease-out;
		color: var(--yellow);
        z-index:88;
    }

    button:hover {
		padding: 1.5rem 2.5rem 1.5rem 3.5rem;
	}


    div:active {
        transform: translateY(5%);
    }

    @media screen and (max-width: 1240px) {
		h2 {
            min-height: 0vw;
			font-size:clamp(1.4rem, 2vw, 1.9rem)
		}
	}

    @media (hover: none) {
        button:hover {
            padding: 1rem 2rem;
        }
    }
    
</style>