<script>
	import SocialButton from '../atoms/SocialButton.svelte';
</script>

<div>
	<SocialButton icon="github" tip="@xafn" link="https://github.com/xafn" />
	<SocialButton icon="discord" tip="afn#0128" link="https://discord.com/users/420043923822608384" />
	<SocialButton icon="email" tip="_@afn.lol" link="mailto:_@afn.lol" />
	<SocialButton icon="kofi" tip="@affan" link="https://ko-fi.com/affan" />
</div>

<style>
	div {
		display: flex;
		gap: 0.75rem;
		justify-content: right;
	}
</style>
