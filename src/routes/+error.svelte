<script>
	import { page } from '$app/stores';
	$: status = $page.status;

	import fs from 'fs';
	const dir = fs.readdirSync('static/art');

    let chosenFile = dir[Math.floor(Math.random() * dir.length)] 
</script>

<div class="main wrapper">
	<div class="flex">
	    <div 
        class="art"
        class:different={chosenFile === "chilly.webp"}
        style="background-image:url(art/{chosenFile})"
        alt="art" />
    	<div class="text">
        	<h6>{chosenFile.slice(0, -5)}</h6>
            <h1>{status}</h1>
    	</div>
	</div>
	<br />
	<a href="/"><h5>Go back home?</h5></a>
</div>

<style>
	.main {
		height: calc(100vh - 70px);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}


    .flex {
        display: flex;
        gap: 2rem;
        align-items: center;
    }

    .text {
        display: flex;
        flex-direction: column;
        transform: translateY(5px);
    }
	.art {
        background-color: var(--neutral-one);
		height: 140px;
		width: 140px;
		border-radius: 200px;
        background-size: cover;
        background-position: 50% 10%;
		background-repeat: no-repeat;
	}

    .different {
        background-position: 50% 60%;
    }

	a {
		text-decoration: none;
		width: 175px;
		transform: translateX(20px);
	}

	a h5::after {
		content: '→';
		margin-left: 0.5rem;
		transition: all 0.4s var(--bezier-one);
	}

	a:hover h5::after {
		margin-left: 0.75rem;
	}

    @media only screen and (max-width: 768px) {
		.flex {
            flex-direction: column;
            gap: 1.5rem;
        }

        .text {
            align-items: center;
        }
	}
</style>
