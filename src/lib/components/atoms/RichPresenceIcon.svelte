<script>
    import { onMount } from "svelte";
    export const icon = "https://cdn.discordapp.com/avatars/420043923822608384/6bf1522d60a8091bea9cf31697b58202.png?size=4096"

    onMount(async () => {
        fetch("https://api.lanyard.rest/v1/users/420043923822608384")
        .then(response => response.json())
        .then((data) => { 
            let username = data.data.discord_user.username;
            console.log(username)
        }).catch(error => {
            console.log(error);
        })
    });
</script>

<div>
    <img src={icon} alt="h">
</div>

<style>
    img {
        height: 150px;
        width: 150px;
        background-color: var(--grey-one);
        border-radius: 50%;
        display: inline-block;
        animation: rotate 15s linear infinite;
        animation-play-state: paused;
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