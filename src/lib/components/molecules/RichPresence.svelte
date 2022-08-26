<script>
    import { onMount } from "svelte";
    import moment from 'moment';

    let data;

    let activityImage = 'favicon.webp';
    let activity = "afn#0001";
    let details = 'hhhh';
    let state = 'i just be h';

    let pulse = 30000;
    let isSpotify = false;
    let progress = 0;
    let elapsed;
    let spotifyTotal = 0;
    

    onMount(() => {
        const lanyard = new WebSocket("wss://api.lanyard.rest/socket");

        lanyard.onopen = () => {
            console.log("Established websocket connection!")
        };
    
        lanyard.onmessage = e => {
            data = JSON.parse(e.data);
            console.log(data);
            
            switch (data.op) {
                case 1: {
                    pulse = data.d.heartbeat_interval;
                    lanyard.send(
                        JSON.stringify({
                            op: 2,
                            d: { subscribe_to_id: "420043923822608384" }
                        })
                    );
                    break;
                };

                case 0: {
                    isSpotify = data.d.listening_to_spotify;

                    if (isSpotify) {
                        ({ song: activity, album_art_url: activityImage} = data.d.spotify);
                        details = `by ${data.d.spotify.artist.replace(/;/g, ',')}`; //why does lanyard use ; guhh??
                        
                        //checking if the song is a single
                        if (activity === data.d.spotify.album) { 
                            state = '';
                        } else {
                            state = `on ${data.d.spotify.album}`
                        };

                        spotifyTotal = data.d.spotify.timestamps.end - data.d.spotify.timestamps.start;
                        setInterval(() => {
                            progress = 100 - (100 * (data.d.spotify.timestamps.end - new Date().getTime())) / spotifyTotal;
                        }, 1000);
                    }
                
                    else {
                        ({ name: activity, details, state } = data.d.activities[0])
                        activityImage = `https://cdn.discordapp.com/app-assets/${data.d.activities[0].application_id}/${data.d.activities[0].assets.large_image}.png`;
                        
                        setInterval(() => {
                            elapsed = new Date().getTime() - data.d.activities[0].timestamps.start
                        }, 1000);
                    };
                    
                    break;
                };
            };
        };

        setInterval(() => {
            lanyard.send(
                JSON.stringify({ op: 3 })
            );
            console.log('pump')
        }, pulse);
    });
    
</script>

<div>
    <img src="{activityImage}" alt="h" class="{isSpotify ? 'spin' : ''}">

    <section>
        <h4> 
            {activity} 
        </h4>

        <h2>
            {details}
            <br />
            {state}
        </h2>

        {#if isSpotify} 
            <progress max="100" value="{progress}" />
        {:else}
            <h2>
                {elapsed}
            </h2>
        {/if}
    </section>

</div>


<style>

    div {
        display:flex;
        gap:2.25rem;
        align-items: center;
    }

    h4 {
        font-weight:500;
        font-size:1.4rem;
        margin-bottom: 0.25rem;
    }

    h2 {
        font-size:1.15rem;
    }

    img {
        height: 135px;
        width: auto;
        background-color: var(--grey-one);
        border-radius: 1.5rem;
        display: inline-block;
        opacity: 1;
    }

    progress {
        -webkit-appearance: none;
        border: 0;
        border-radius: 10rem;
        margin:0;
        margin-top: 0.6rem;
    }

    progress::-webkit-progress-bar {
        background-color: var(--grey-one);
        border-radius: 1rem;
        transform: translateY(0.2rem);
        height:0.6rem;
        
    }

    progress[value]::-webkit-progress-value {
        background-color: var(--yellow);
        border-radius: 10rem;
        
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .spin {
        animation: rotate 30s linear infinite;
        border-radius: 50%;
    }

</style>