<script>
    import RichPresence from "../molecules/RichPresence.svelte";
    import moment from 'moment';

    let age = moment().diff('20070326', 'years');

</script>

<section id="about">
    <div>
        
        <div class="rich">
            <RichPresence />
        </div>

        <div class="text">
            <h5>bio</h5>
            <h6>Hello funny people in my screen :&#93; I'm a <span>{age}</span> year old digital artist and graphic/UI designer based in Canada. I’ve taken art seriously since <span>2017</span>, and have been doodling goofy anime characters since <span>2020</span>. I’ve also done some design work in open-source projects. Recently, however, I’ve grown a knack in programming. Currently learning Python, and JS → Svelte. Hope to move onto Flutter one day. Don’t look into it though, it’s not even that interesting.</h6>
        </div>
    </div>
</section>

<style>
    section {
        display: inline-block;
        margin-bottom: 5rem;
    }
        
    section > div {
        display: grid;
        gap: 2rem;
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

    span {
		font-weight: 400;
        font-family: var(--font-two);
        font-size: 0.9rem;
		background-color: var(--grey-one);
		border-radius: 10px;
		padding: 0.15rem 0.7rem 0.15rem;
		width:fit-content;
    }
    
    .text::before {
        height:300px;
        font-size: 300px;
        content:'afn';
        font-weight:800;
        z-index: -1;
        user-select: none;
        transform: translateY(-70%) translateX(97%);
        -webkit-text-stroke: 2px var(--white);
        color:transparent;
        opacity:0.25;
        letter-spacing: -0.075em;
        position: absolute;

    }

    h5 {
        display:none;
        margin-top: 1rem;
    }

    @media (max-width: 850px){
        section > div {
            display:flex;
            flex-direction: column;
        }

        section  {
            margin-bottom: -2rem;
        }

        h5 {
            display:block;
        }
    }
</style>