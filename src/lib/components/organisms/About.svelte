<script>
	import RichPresence from '../molecules/RichPresence.svelte';

	// i didnt write this idk
	let getAge = () => {
		let today = new Date();
		let birthDate = new Date('2007/03/24');
		let age = today.getFullYear() - birthDate.getFullYear();
		let m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	};
</script>

<section id="about">
	<div>
		<div class="rich">
			<RichPresence />
		</div>
		<div class="text">
			<h2>bio</h2>
			<p>
				Hello funny people in my screen :&#93; I'm a <span>{getAge()}</span> year old digital artist
				and graphic/UI designer based in Canada. I’ve taken art seriously since <span>2017</span>,
				and have been doodling goofy anime characters since <span>2020</span>. I’ve also done some
				design work in open-source projects. Recently, however, I’ve grown a knack in programming.
				Currently learning Python, Typescript, and Svelte. Hope to move onto Flutter one day. Don’t
				look into it though, it’s not even that interesting.
			</p>
		</div>
	</div>
</section>

<style>
	section {
		display: inline-block;
		margin-bottom: 6rem;
	}

	section > div {
		display: grid;
		gap: 1.75rem;
		grid-template-columns: 1fr 1fr;
	}

	.rich {
		display: flex;
		align-items: center;
	}

	.text {
		position: relative;
		line-height: 1.75rem;
	}

	span {
		font-weight: 400;
		font-family: var(--font-two);
		font-size: 0.9rem;
		background-color: var(--grey-one);
		border-radius: 7px;
		padding: 0.2rem 0.5rem 0.2rem;
		width: fit-content;
	}

	.text::before {
		height: 300px;
		font-size: 300px;
		content: 'afn';
		font-weight: 700;
		z-index: -1;
		user-select: none;
		transform: translateY(-5%) translateX(97%);
		-webkit-text-stroke: 2px var(--white);
		color: transparent;
		opacity: 0.25;
		letter-spacing: -0.075em;
		position: absolute;
	}

	h2 {
		display: none;
		margin-top: 1rem;
	}

	@media (max-width: 868px) {
		section > div {
			display: flex;
			flex-direction: column;
		}

		section {
			margin-bottom: -2rem;
		}

		h2 {
			display: block;
		}
	}
</style>
