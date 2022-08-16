<script>
    import Nav from "../atoms/Nav.svelte";
</script>

<nav class="navbar">
    <ul>
        <Nav href="#home">home</Nav>
        <Nav href="#about">about</Nav>
        <Nav href="#aw">work</Nav>
    </ul>
</nav>

<style>
    .navbar {
        width: 100%;
        text-align:center;
        align-items:center;
        position:fixed;
        top:0;
        padding: 1.5rem 0;
        z-index:999;
        background-color: #120e0ebb;
        backdrop-filter: blur(15px);
        background-blend-mode: overlay;
    }

    .navbar ul {
        display: flex;
        gap:4rem;
        justify-content: center;
    }
    
    .navbar.active {
        border-bottom: 1.5px solid var(--yellow-opacity);
        padding: 1rem 0;
    }

</style>