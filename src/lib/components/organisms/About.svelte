<script>
    import RichPresenceHost from "../molecules/RichPresenceHost.svelte";
</script>

<section id="about">
    <div>
        <div class="rich">
            <RichPresenceHost />
        </div>
        <div class="text">
            <h6>
                Hello funny people in my screen ☺. I'm a 15 year old digital artist and graphic/UI designer based in Canada. I’ve taken art seriously since 2017, and have been doodling goofy anime characters since 2020. I’ve also done some design work in open-source projects. Recently, however, I’ve grown a knack in programming. Currently learning Python, and JS -> Svelte. Hope to move onto Flutter one day. Don’t look into it though, it’s not even that interesting.
            </h6>
        </div>
    </div>
</section>

<style>
    section > div {
        display:grid;
		grid-template-columns: 1fr 1fr;
        flex-direction: column;
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
        transform: translateY(-70%) translateX(97%);
        z-index: -1;
        user-select: none;
        -webkit-text-stroke: 2px var(--white);
        color:transparent;
        opacity:0.25;
        letter-spacing: -0.075em;
        
        position: absolute;
    }
</style>