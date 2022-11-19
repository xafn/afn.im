<script>
	import { page } from '$app/stores';
	import { error } from '@sveltejs/kit';

	$: status = $page.status;
</script>

<div class="wrapper">
    <h1>{status}</h1>
    <h6>{$page.error.message}</h6>
</div>


<style>
    div {
        height: calc(100vh - 70px);
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>