<script>
    export let icon = 'Github';
    export let link = '';
</script>

<div>
    <a href = "{link}" target = "_blank">
        <img src="icons/{icon}.svg" alt="{icon}"/>
    </a>
</div>

<style>

    a {
        transition: all 0.3s var(--bezier-one);
        display:flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        background-color: transparent;
        border: none;
        border-radius: 10px;
        cursor: pointer;
    }

    div {
        transition: all 0.3s var(--bezier-one);
    }

    div:hover > a{
        transform: translateY(-5%);
        background-color: var(--yellow-opacity);
    }

    div:active{
        transform: scale(95%);
    }

    img {
        height:26px;
        width:26px;
        opacity: 0.7;
        transition: all 0.3s var(--bezier-one);  
    }
</style>