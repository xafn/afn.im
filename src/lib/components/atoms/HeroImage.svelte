<div>
    <img src="HeroImage.webp" alt="A drawing of me.">
</div>

<style>
    @keyframes float {
        0% {
            transform: translateY(7px);
        }

        50% {
            transform: translateY(-7px);
        }

        100% {
            transform: translateY(7px);
        }
    }
        

    img {
        border-radius: 55px;

        width:450px;
        height: auto;
        transition: width 0.4s var(--bezier-one), transform 0.4s var(--bezier-one), box-shadow 0.4s var(--bezier-one);
        transform: rotate3d(0,0,0,0deg) !important;
    }


    img:hover {
        width:435px;
        transform:rotate3d(1,0,1,6deg) !important;
        box-shadow: 0 0 2rem #97918d27, 3.2rem 3.2rem 0 var(--grey-one), 6.4rem 6.4rem 0 var(--grey-two);
    }
    img:active {
        box-shadow: 0 0 2rem #97918d27, 2rem 2rem 0 var(--grey-one), 4rem 4rem 0 var(--grey-two);
    }

    div {
        float:right;
        user-select: none;
        position: relative;
        display: block;
        animation: float 6s ease-in-out infinite !important;
    }

    @media (max-width: 1240px){
        img {
            min-height: 0vw;
			width:clamp(340px, 40vw, 450px);
        }

        img:hover {
            width:39vw;
            
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
