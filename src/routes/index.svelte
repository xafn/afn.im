<script>
    import Hero from "$lib/components/organisms/Hero.svelte";
    import About from "$lib/components/organisms/About.svelte";
    import Work from "$lib/components/organisms/Work.svelte";
    import Footer from "$lib/components/molecules/Footer.svelte";
</script>


<div class="wrapper">
   <span id="home"> 
        <Hero />
    </span>
    <About />
</div>

<Work />   

<div class="wrapper">
    <Footer/>
</div>

<style>
    #home {
        scroll-margin-top: 20rem;
    }

    
</style>

