<script>
    import RichPresenceHost from "../molecules/RichPresenceHost.svelte";
</script>

<section id="about">
    <div>
        <div class="rich">
            <RichPresenceHost />
        </div>
        <div class="text">
            <h6>Hello funny people in my screen :&#93; I'm a 15 year old digital artist and graphic/UI designer based in Canada. I’ve taken art seriously since 2017, and have been doodling goofy anime characters since 2020. I’ve also done some design work in open-source projects. Recently, however, I’ve grown a knack in programming. Currently learning Python, and JS → Svelte. Hope to move onto Flutter one day. Don’t look into it though, it’s not even that interesting.</h6>
        </div>
    </div>
</section>

<style>
    section {
        display: inline-block;
        margin-bottom: 5.5rem;
    }
        
    section > div {
        display:grid;
        gap:1.5rem;
		grid-template-columns: 1fr 1fr;
    }

    h6 {
        text-align: justify;
    }

    .rich {
        display: flex;
        align-items: center;
    }

    .text {
        position: relative;
        z-index: 1;
    }
    .text::before {
        height:300px;
        font-size: 300px;
        content:'afn';
        font-weight:800;
        z-index: -1;
        user-select: none;
        transform: translateY(-80%) translateX(97%);
        -webkit-text-stroke: 2px var(--white);
        color:transparent;
        opacity:0.25;
        letter-spacing: -0.075em;
        position: absolute;

    }

    @media (max-width: 1000px){
        section > div {
            display:flex;
            flex-direction: column;
            
        }

    }
</style>