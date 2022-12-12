<script>
	import { page } from '$app/stores';
	$: status = $page.status;
</script>

<div class="wrapper">
    <h1>{status}</h1>
    <h4>{$page.error?.message}</h4>
</div>


<style>
    div {
        height: calc(100vh - 70px);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
</style>