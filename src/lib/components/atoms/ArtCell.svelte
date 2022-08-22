<script>
    export let type = '';
    export let art = 'HeroImage';
    export let name = '';

    let clicked = false;

</script>

<div 
    class = "card {type}" 
    style = "background-image:url(art/{art}.webp)" 
    on:click = {() => {clicked = !clicked;}}
></div>

{#if clicked}
    <div class="img-contain" on:click = {() => {clicked = !clicked;}}>
        <h4>{name}</h4>
        <img src="art/{art}.webp" alt="{name}"/>
        <!-- <h5>{name}</h5> -->
        <h2>Click anywhere to dismiss</h2>
    </div>
{/if}

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
        cursor: pointer;

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
        border-radius:3vh;
        display:flex;
        justify-content: center;
        align-items: center;

        animation-name: blurr;
        animation-duration: 0.4s;
        animation-timing-function: ease-in-out;
        animation-fill-mode: forwards; 
    }

    /* h5 {    
        font-size: 23vw;
        width:fit-content;
        font-weight:800;
        z-index: -1;
        background-color: transparent;
        user-select: none;
        text-align: center;
        -webkit-text-stroke: 0.1vw var(--white);
        color:transparent;
        opacity:0.25;
        letter-spacing: -0.075em;
        position: absolute;

    } */


    
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
    
</style>