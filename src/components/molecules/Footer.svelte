<script>
	import Tooltip from '../atoms/Tooltip.svelte';
	import Socials from './Socials.svelte';
</script>

<hr />
<footer class="wrapper">
	<Socials />
	<h6>
		Made with pain. &#60;3
		<Tooltip tip="you're here"><span>V2</span></Tooltip>
		<Tooltip tip="how to delete">
			<a href="https://v1.afn.im/" target="_blank" rel="noreferrer">V1</a>
		</Tooltip>
	</h6>
</footer>

<style lang="scss">
	hr {
		background-color: var(--neutral-one);
		height: 1px;
		border: 0;
		width: 100%;
		margin-bottom: 2rem;

		@media screen and (max-width: 768px) {
			margin-bottom: 1.5rem;
		}
	}

	footer {
		padding-bottom: 2.4rem;
		display: flex;
		justify-content: space-between;
		align-items: center;

		@media screen and (max-width: 768px) {
			flex-direction: column;
		}
	}

	h6 {
		text-align: center;
		line-height: 2.5rem;
		margin-top: 0;
	}

	span {
		font-family: var(--font-two);
		background-color: var(--neutral-one);
		border-radius: 7px;
		padding: 0.15rem 0.5rem 0.15rem;
		width: fit-content;
		margin-left: 1rem;
		margin-right: 0.4rem;
	}

	a {
		transition: 0.3s var(--bezier-one);
		font-family: var(--font-two);
		text-decoration: none;
		color: var(--white-two);
		font-size: 0.9rem;
		border-radius: 7px;
		padding: 0.15rem 0.5rem 0.15rem;

		&:hover {
			font-weight: 400;
			background-color: var(--yellow);
			color: var(--neutral-one);
			border-radius: 7px;
			width: fit-content;
		}
	}
</style>
