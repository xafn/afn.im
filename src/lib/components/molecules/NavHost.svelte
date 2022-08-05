<script>
    import Nav from "../atoms/Nav.svelte";
</script>

<nav>
    <ul>
        <Nav href="#home">home</Nav>
        <Nav href="#about">about</Nav>
        <Nav href="#work">work</Nav>
    </ul>
</nav>

<style>
    nav {
        width: 100%;
        text-align:center;
        align-items:center;
        background-color: var(--bg-color);
        position:fixed;
        top:0;
        padding: 1.5rem 0;
        z-index:999;
    }

    nav ul {
        display: flex;
        gap:4%;
        justify-content: center;
    }
</style>