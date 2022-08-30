<script>
    import Socials from "$lib/components/molecules/Socials.svelte";
</script>

<footer>
    <hr>
    <div>
        <Socials/>
        <h2>Reposting without credit is prohibited.  <span>V2</span> <a href="https://v1.afn.lol/" target="_blank" >V1</a></h2>
        
    </div>
    
</footer>


<style>
    footer {
        padding-bottom: 3rem;
        display:flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    div {
        width:98%;
        display:flex;
        justify-content: space-between;
        align-items: center;
    }
    
    hr {
        background-color: var(--white); 
        height: 2px; 
        border: 0;
        opacity:0.2;
        width:100%;
        margin-bottom:2rem;
    }

    h2 {
        font-size:0.9rem;
        opacity:0.7;
        text-align: center;
    }

    span {
        font-weight: 400;
        font-family: var(--font-two);
		background-color: var(--grey-one);
		border-radius: 7px;
		padding: 0.15rem 0.5rem 0.15rem;
		width:fit-content;
        margin-right: 0.4rem;
    }

    a {
        transition: 0.3s var(--bezier-one);
        font-family: var(--font-two);
        text-decoration: none;
        color: var(--white);
		font-weight: 300;
		font-size:0.9rem;
        border-radius: 7px;
        padding: 0.15rem 0.5rem 0.15rem;
    }

    a:hover {
        font-weight: 400;
		background-color: var(--yellow);
        color:var(--grey-one);
		border-radius: 7px;
		width:fit-content;
    }

    @media screen and (max-width: 768px) {
        hr {
            margin-bottom: 1.5rem;
        }

        div {
            flex-direction: column;
            gap:0.5rem;
        }
	}
</style>