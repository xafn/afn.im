<script>
    import ArtCell from "../atoms/ArtCell.svelte";
</script>

<div class="idfk">
    <div class="contain">
        <div class="grid">   
                <ArtCell art="painted_red" type="tall"/>
                <ArtCell art="drown"/>
                <ArtCell art="bling" type="tall"/>
                <ArtCell art="murder"/>
                <ArtCell art="diverge" type="tall"/>
                <ArtCell art="smoke" type="tall"/>
                <ArtCell art="windy" type="tall"/>
                <ArtCell art="cry" type="tall"/>
                <ArtCell art="crop"/>
                <ArtCell art="smile"/>
        </div>
    </div>
</div>

<style>
    .grid {
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
        margin-bottom: 4rem;
        
    }
</style>