<script>
    import { onMount } from "svelte";
    let icon;
    let app_id;
    let app_image;

    onMount(async () => {
        const response = await fetch("https://api.lanyard.rest/v1/users/420043923822608384")
        const data = await response.json();
        app_id = data.data.activities[1].application_id
        app_image = data.data.activities[1].assets.large_image
        icon = `https://cdn.discordapp.com/app-assets/${app_id}/${app_image}.webp`
    });

</script>

<div>
    {#if app_id === undefined}
        <img src="favicon.png" alt="h">
    {:else}
        <img src={icon} alt="h">
    {/if}
</div>

<style>
    img {
        height: 135px;
        width: 135px;
        background-color: var(--grey-one);
        border-radius: 50%;
        display: inline-block;
        animation: rotate 15s linear infinite;
        animation-play-state: paused;
        opacity:0.9;
    }

    div {
        user-select: none;
    }


    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    img:hover {
        animation: rotate 15s linear infinite;
        animation-play-state: running;
    }

    img:active {
        animation: rotate 15s linear infinite;
        animation-play-state: running;
    }

</style>