<script>
	import Social from '../atoms/Social.svelte';
	import { user } from '../../util/discord';
</script>

<div class="socials-container">
	<Social icon="github" tip="@xafn" link="https://github.com/xafn" />
	<Social icon="discord" tip={user.fullName()} link={`https://discord.com/users/${user.id}`} />
	<Social icon="email" tip="_@afn.lol" link="mailto:_@afn.lol" />
	<Social icon="kofi" tip="@affan" link="https://ko-fi.com/affan" />
</div>

<style>
	.socials-container {
		display: flex;
		gap: 0.75rem;
	}
</style>
