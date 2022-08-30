<script>
    import Hero from "$lib/components/organisms/Hero.svelte";
    import About from "$lib/components/organisms/About.svelte";
    import Work from "$lib/components/organisms/Work.svelte";
    import Footer from "$lib/components/molecules/Footer.svelte";
</script>


<div class="wrapper margin">
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

    .margin {
        margin-top: 7.25rem;
    }

    @media screen and (max-width: 850px){
        :global(.margin) {
			margin-top: 4rem !important;
        }
    }
    
</style>



