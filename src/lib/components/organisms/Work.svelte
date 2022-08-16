<script>
    import ArtGrid from "$lib/components/molecules/ArtGrid.svelte";
    import ArtCell from "../atoms/ArtCell.svelte";
    import SkillGrid from "../molecules/SkillGrid.svelte";
</script>


<div>
    <div class="art-work" id="aw">
        <h5><span>art</span>:work</h5>
    </div>
    <ArtGrid />
    <SkillGrid />
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