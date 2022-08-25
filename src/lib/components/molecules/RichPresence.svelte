<script>
    import { onMount } from "svelte";

    let data;
    let activity = "afn#0001";
    let details = 'hhhh';
    let state = 'i just be h';
    let pulse = 30000;
    let isSpotify = false;
    let progress = 0;  
    let activityImage = 'favicon.webp';

    onMount(() => {
        const lanyard = new WebSocket("wss://api.lanyard.rest/socket");

        lanyard.onopen = function() {
            console.log("Established websocket connection!")
        };
    
        lanyard.onmessage = function (e) {
            data = JSON.parse(e.data);
            console.log(data);
            
            switch (data.op) {
                case 1: {
                    pulse = data.d.heartbeat_interval
                    lanyard.send(
                        JSON.stringify({
                            op: 2,
                            d: { subscribe_to_id: "420043923822608384" }
                        })
                    );
                    break;
                }

                case 0: {
                    isSpotify = data.d.listening_to_spotify;

                    if (isSpotify) {
                        activity = data.d.spotify.song;
                        activityImage = data.d.spotify.album_art_url;
                        details = `by ${data.d.spotify.artist.replace(/;/g, ',')}`; //why does lanyard use ; guhh??

                        //checking if it's a single
                        if (activity === data.d.spotify.album) {
                            state = '';
                        } else {
                            state = `on ${data.d.spotify.album}`
                        };

                        setInterval(() => {
                            const total = data.d.spotify.timestamps.end - data.d.spotify.timestamps.start;
                            progress = 100 - (100 * (data.d.spotify.timestamps.end - new Date().getTime())) / total;
                        }, 1000)
                        
                    } 
                
                    else {
                        activity = data.d.activities[0].name
                        details = data.d.activities[0].details
                        state = data.d.activities[0].state
                        activityImage = `https://cdn.discordapp.com/app-assets/${data.d.activities[0].application_id}/${data.d.activities[0].assets.large_image}.webp`;
                    }
                    break;
                }
            }
        }

        setInterval(() => {
            lanyard.send(
                JSON.stringify({
                    op: 3
                })
            );
            console.log('pump')
        }, pulse)

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

    progress::-webkit-progress-bar {
        background-color: yellow !important;
        border-radius: 0rem;
    }

    img {
        height: 135px;
        width: auto;
        background-color: var(--grey-one);
        border-radius: 1.5rem;
        display: inline-block;
        opacity: 0.75;
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