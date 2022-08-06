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
            <Button>Discover my work ↓</Button>
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
    }
    section > div > div {
		display: inline-block;
        margin-bottom: 9rem;
	}

    h4 {
        margin-top: 1rem;
        margin-bottom: 3rem;
    }
</style>

