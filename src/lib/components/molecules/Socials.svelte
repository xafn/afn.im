<script>
	import SocialButton from '../atoms/SocialButton.svelte';
</script>

<div>
	<SocialButton icon="github" link="https://github.com/xafn" />
	<SocialButton icon="discord" link="https://discord.com/users/420043923822608384" />
	<SocialButton icon="email" link="mailto:hey@afn.lol" />
	<SocialButton icon="kofi" link="https://ko-fi.com/affan" />
</div>

<style>
	div {
		display: flex;
		gap: 0.75rem;
		justify-content: right;
	}
</style>
