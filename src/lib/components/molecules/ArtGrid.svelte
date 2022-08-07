<script>
    import ArtCell from "../atoms/ArtCell.svelte";
</script>

<div class="idfk">
    <div class="contain">
        <div class="grid">   
                <ArtCell art="painted_red.png" type="tall"/>
                <ArtCell art="drown.png"/>
                <ArtCell art="bling.png" type="tall"/>
                <ArtCell art="murder.png"/>
                <ArtCell art="diverge.png" type="tall"/>
                <ArtCell art="smoke.png" type="tall"/>
                <ArtCell art="windy.png" type="tall"/>
                <ArtCell art="cry.png" type="tall"/>
                <ArtCell art="crop.png"/>
                <ArtCell art="smile.png"/>
        </div>
    </div>
</div>

<style>
    .grid {
        margin-top: 4rem;
        gap: 1rem;
        grid-auto-rows: 240px;
        flex-direction:column;
        justify-content: center;
        align-items: center;
        display:grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }

    .contain {
        width: min(90%, 80rem);
    }

    .idfk {
        display:flex;
        justify-content: center;
    }
</style>