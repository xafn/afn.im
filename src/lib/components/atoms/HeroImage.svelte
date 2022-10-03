<script lang="ts">
    import { onMount } from 'svelte';

    onMount (() => {
        let el = document.getElementById('tilt');
        el!.addEventListener('mousemove', handleMove)

        function handleMove(e: any) {
            const yRotation = 13 * ((e.layerX - el!.clientHeight / 2) / el!.clientWidth);
            const xRotation = -13 * ((e.layerY - el!.clientWidth / 2) / el!.clientHeight);
            el!.style.transform = `perspective(500px) scale(1.05) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
        }

        el!.addEventListener('mouseout', function() {
            el!.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)';
        });
    }); 
</script>

<div>
    <img src="HeroImage.webp" alt="A drawing of me." id="tilt">
</div>

<style>
    @keyframes float {
        0% { transform: translateY(7px); }
        50% { transform: translateY(-7px); }
        100% { transform: translateY(7px); }
    }

    img {
        border-radius: 55px;
        width: 450px;
        height: auto;
        z-index: 11;
        display: block;
        transition: width 0.4s var(--bezier-one), transform 0.4s var(--bezier-one), box-shadow 0.4s var(--bezier-one);
        
    }

    div {
        float:right;
        user-select: none;
        display: block;
        z-index: 12;
        animation: float 6s ease-in-out infinite !important;
    }

    @media (max-width: 1240px){
        img {
            min-height: 0vw;
			width:clamp(340px, 40vw, 450px);
        }

        div {
            display:flex;
            justify-content: center;
        }
    }

    @media (max-width: 768px){
        img {
            display:none;
        }
    }
</style>
