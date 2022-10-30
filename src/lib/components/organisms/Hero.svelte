<script>
    import HeroTitle from "../atoms/HeroTitle.svelte";
    import HeroImage from "$lib/components/atoms/HeroImage.svelte";
    import Button from "../atoms/Button.svelte";

</script>

<section id="home">
    <div>
        <div>
            <HeroTitle />
            <h4>Hobbyist illustrator and designer. <br />Attempting to program.</h4>
            <span><Button>Discover my work ↓</Button></span>
        </div>
        <HeroImage />
    </div>
</section>


<style>
    /* IM SO SORRY ITS SO BAD */

    section {
        scroll-margin-top: 20rem;
        display:flex;
        width:100%;
    }

    section > div {
        width:100%;
        margin-bottom: 2.8rem;
    }

    section > div > div {
		display: inline-block;
        padding-bottom:9rem;
	}

    h4 {
        margin-top: 1rem;
        margin-bottom: 1.7rem;
        color: var(--white-two);
    }




    @media screen and (max-width: 400px) {
		br {
            content:'&#160;';
	    }
	}

    @media screen and (max-width: 1240px) {
		h4 {
            min-height: 0vw;
			font-size:clamp(1.4rem, 2.4vw, 1.7rem);
		}
	}

    @media screen and (max-width: 1000px) {
		section > div {
			margin-bottom: 2rem;
		}
	}

    @media screen and (max-width: 868px) {
        section > div > div {
            padding-bottom:6rem;
	    }

	}

    @media screen and (max-width: 768px) {
        section > div > div {
            padding-bottom:0.75rem;
	    }

	}
</style>

