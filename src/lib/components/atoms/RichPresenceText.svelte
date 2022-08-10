<script>
    import { onMount } from "svelte";

    let activity;
    let details;
    let unixTime;
    let state;

    $: currentTime = new Date().getTime();
    $: timeSince = currentTime - unixTime;
    $: time = new Date(timeSince);
    $: hours = time.getHours();
    $: minutes = "0" + time.getMinutes();
    $: seconds = "0" + time.getSeconds();
    

    onMount(() => {
		const interval = setInterval(() => {
			currentTime = new Date().getTime();
		}, 1000);
    });

    onMount(async () => {
        const response = await fetch("https://api.lanyard.rest/v1/users/420043923822608384")
        const data = await response.json();
        console.log(data);
        activity = data.data.activities[1].name.toUpperCase();
        details = data.data.activities[1].details;
        state = data.data.activities[1].state;
        unixTime = data.data.activities[1].timestamps.start;
    });



</script>

<section>
    <h4>
        {#if activity === undefined}
            JUST LIVING
        {:else}
            {activity}
        {/if}
    </h4>
    <h2>
        {#if details === undefined}
            guhhhhh
            <br />
        {:else}
            {details}
            <br />
        {/if}

        {#if state === undefined}
            i just be j
        {:else}
            {state}
            <br />
        {/if}

        {#if timeSince === undefined}
            <span></span>
        {:else}
            <!-- {currentTime}
            {unixTime}
            {hours}:{minutes.substr(-2)}:{seconds.substr(-2)} elapsed -->
        {/if}
    </h2>
</section>


<style>
    h4 {
        background-color: var(--grey-one);
        border-radius: 100px;
        font-weight:500;
        padding: 0.5rem 1.5rem;
        width:fit-content;
        font-size:1.4rem;
        transform: translateX(-5%);
        margin-bottom: 0.25rem;
    }

    h2 {
        font-size:1.25rem;
    }

</style>