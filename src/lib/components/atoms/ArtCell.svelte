<script>
    export let type = '';
    export let art = 'HeroImage';
    export let name = '';
    export let shrink = '';

    let clicked = false;

</script>

<div 
    class = "card {type} {shrink}" 
    style = "background-image:url(art/{art}.webp)"
    on:click = {() => {clicked = !clicked;}}
>{name}</div>

{#if clicked}
    <div class="img-contain" on:click = {() => {clicked = !clicked;}}>
        <h4>{name}</h4>
        <img src="art/{art}.webp" alt="{name}"/>
        <h2>Click anywhere to dismiss</h2>
    </div>
{/if}

<style>
    .card {
        height: 100%;
        width: 100%;
        border-radius:4px;
        overflow: hidden;
        background: var(--grey-one); 
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        transition: transform 0.3s var(--bezier-one), box-shadow 0.3s var(--bezier-one);
        cursor: pointer;
        font-size: 0;
        user-select: none;

    }

    .card:hover {
        transform: translateY(-0.5%);
        box-shadow: 0 0 2rem #c0997f16
    }

    .tall {
        grid-row: span 2 / auto;
    }

    @keyframes blurr {
        0% {
            opacity:0;
            background-color: #0a080800;
            backdrop-filter: blur(0px);
            -webkit-backdrop-filter: blur(0px);
        }
        100% {
            opacity:1;
            background-color: #0a0808bb;
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
        }
    }

    @keyframes unblurr {
        0% {
            opacity:1;
            background-color: #0a0808bb;
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
        }
        100% {
            opacity:0;
            background-color: #0a080800;
            backdrop-filter: blur(0px);
            -webkit-backdrop-filter: blur(0px);
        }
    }

    img {
        max-height:86vh;
        height:auto;
        max-width:86vw;
        border-radius:2vh;
        display:flex;
        justify-content: center;
        align-items: center;

        animation-name: blurr;
        animation-duration: 0.4s;
        animation-timing-function: ease-in-out;
        animation-fill-mode: forwards; 
    }

    .img-contain {
        background-blend-mode: overlay;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position:fixed;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        height:100vh;
        width:100vw;
        z-index:1000;
        cursor: pointer;
        user-select: none;

        animation-name: blurr;
        animation-duration: 0.5s;
        animation-timing-function: ease-in-out;
        animation-fill-mode: forwards; 
    }

    h4, h2 {
        margin: 1vh;
    }
    
    h2  {
        font-size:2vh;
        margin-top:2vh;
    }

    h4 {
        font-size:3.5vh;
        font-weight:500;
    }
    
    @media only screen and (max-width: 1164px) { 
        .shrink {
            grid-row: span 1 / auto;
        }
    } 

    @media screen and (max-width: 600px) {
        .card {
            border-radius: 0;
        }
    }
</style>