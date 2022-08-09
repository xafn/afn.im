<script>
    import { onMount } from "svelte";
    const fetchLanyardData = fetch("https://api.lanyard.rest/v1/users/420043923822608384")
        .then(response => response.json())
        .then((data) => { 
            return data
        }).catch(error => {
            console.log(error);
    });

    const getLanyardData = async () => {
        const a = await fetchLanyardData;
        console.log(a);
        return a;
    };

    const data = getLanyardData();
    
</script>

<section>
    <h4>hi </h4>
    <h2>Jungle by <br/>
    CIX HELLO Chapter 3: Hello, Stranger</h2>
    <br />
    <h2>1:11 - 3:14 </h2>
</section>


<style>
    h4 {
        background-color: var(--grey-one);
        border-radius: 100px;
        padding: 0.5rem 1.5rem;
        width:fit-content;
        font-size:1.5rem;
        transform: translateX(-13%);
        margin-bottom: 0.75rem;
    }

    h2 {
        font-size:1.25rem;
    }

</style>