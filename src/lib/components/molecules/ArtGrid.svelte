<script>
    import ArtCell from "../atoms/ArtCell.svelte";
</script>

<div class="idfk" >
    <div class="contain" id = "carduu">
        <div class="grid">   
                <ArtCell art="painted_red" name="painted_red" type="tall"/>
                <ArtCell art="drown" name="drowning" />
                <ArtCell art="bling" name="BL1NG!" type="tall"/>
                <ArtCell art="murder" name="811" />
                <ArtCell art="diverge" name="diverge" type="tall"/>
                <ArtCell art="smoke" name="FADE" type="tall"/>
                <ArtCell art="windy" name="kind of cold" type="tall" shrink="shrink"/>
                <ArtCell art="cry" name="ribbons" type="tall" />
                <ArtCell art="crop" name="asumi" />
                <ArtCell art="smile" name="doodle" />
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
        width: min(90%, 75rem);
    }

    .idfk {
        display:flex;
        justify-content: center;
        margin-bottom: 4rem;
        
    }
</style>