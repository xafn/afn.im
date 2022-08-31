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

    a {
        transition: all 0.3s var(--bezier-one)
    }

    a:hover{
        transform: translateY(-5%);
    }

    a:active{
        transform: scale(95%);
    }

    img {
        height:25px;
        width:25px;
        opacity: 0.7;
        transition: all 0.3s var(--bezier-one);  
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

    button:hover > img {
        opacity:1;
    }   

   
</style>