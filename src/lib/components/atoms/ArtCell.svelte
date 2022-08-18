<script>
    export let type = '';
    export let art = 'HeroImage.png';
</script>

<div class = "card {type}" style = "background-image:url(art/{art}.webp)"> </div>


<style>
    .card {
        background-color: var(--grey-three);
        height: 100%;
        width: 100%;
        border-radius:7px;
        overflow: hidden;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        cursor: pointer;;

    }

    .card:hover {
        transform: translateY(-0.5%);
        box-shadow: 0 0 2rem #c0997f16
    }

    .tall {
        grid-row: span 2 / auto;
    }
</style>