<script>
    import HeroTitle from "../atoms/HeroTitle.svelte";
    import Button from "../atoms/Button.svelte";
</script>

<div>
    <HeroTitle />

    <h4>
        Hobbyist illustrator and designer. <br />Attemping to program.
    </h4>

    <Button>Discover my work ↓</Button>
</div>


<style>
    div {
		display: inline-block;
        margin-bottom: 7rem;
	}

    h4 {
        margin-top: 1rem;
        margin-bottom: 3rem;
    }
</style>

