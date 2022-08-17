<script>
    import HeroTitle from "../atoms/HeroTitle.svelte";
    import HeroImage from "$lib/components/atoms/HeroImage.svelte";
    import Button from "../atoms/Button.svelte";

</script>

<section>
    <div>
        <div>
            <HeroTitle />
            <h4>Hobbyist illustrator and designer. <br />Attemping to program.</h4>
            <span><Button>Discover my work ↓</Button></span>
        </div>
        
        <HeroImage />
    </div>
</section>


<style>
    section {
        display:flex;
        width:100%;
    }

    section > div {
        width:100%;
        margin-bottom: 3.75rem;
    }
    section > div > div {
		display: inline-block;
        padding-bottom:9rem;
	}

    span {
        position: absolute;
    }
    
    h4 {
        margin-top: 1rem;
        margin-bottom: 3rem;
    }

    /* @media screen and (max-width: 768px) {
		section > div > div {
            padding-bottom:5rem;
            display: grid;
            align-items: center;
            justify-content: center;
	    }

        section > div {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        h4 {
            text-align: center;
        }

        span {
            display: flex;
            align-items: center;
            justify-content: center;
            transform: translateY(300%);
        }


	} */

    @media screen and (max-width: 500px) {
		br {
            content:'&#160;';
	    }
	}

    @media screen and (max-width: 1240px) {
		h4 {
			font-size:clamp(1rem, 10vw, 1.5rem)
		}

	
	}

</style>

