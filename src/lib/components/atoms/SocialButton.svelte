<script>
    export let icon = 'Github';
    export let link = '';
</script>

<a href = "{link}" target = "_blank">
    <button>
        <img src="icons/{icon}.svg" alt="{icon}"/>
    </button>
</a>

<style>

    img {
        height:25px;
        width:25px;
    }
    
    button {
        display:flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        background-color: transparent;
        border: none;
        border-radius: 10px;
        transition: all 0.3s var(--bezier-one);
        cursor: pointer;
    }

    button:hover {
        background-color: var(--yellow-opacity);
    }   

   
</style>