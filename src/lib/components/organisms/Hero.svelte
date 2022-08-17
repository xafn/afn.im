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

    @media screen and (max-width: 768px) {
		section > div > div {
            padding-bottom:5rem;
	    }
	}

    @media screen and (max-width: 500px) {
		br {
            content:'&#160;';
	    }
	}

</style>

