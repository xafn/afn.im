<script>
        import ArtGrid from "$lib/components/molecules/ArtGrid.svelte";
import ArtCell from "../atoms/ArtCell.svelte";
</script>


<div>
    <div class="art-work">
        <h5><span>art</span>:work</h5>
    </div>
    <ArtGrid />
</div>

<style>
    span {
        color:var(--yellow);
    }
    

    .art-work {
        display: flex;
        justify-content: center;
        margin-bottom: 2rem;
    }
</style>