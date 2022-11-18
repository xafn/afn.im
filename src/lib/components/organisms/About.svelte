<script>
	import RichPresence from '../molecules/RichPresence.svelte';
	import Tooltip from '../atoms/Tooltip.svelte';

	// i didnt write this idk
	let getAge = () => {
		let birthDate = new Date('2007/03/24');
		const ageMs = Date.now() - birthDate.getTime();
		const preciseAge = (ageMs / 31536000000).toFixed(10);
		return preciseAge;
	};

	let age = getAge();
	setInterval(() => {
		age = getAge();
	}, 1000);
</script>

<section id="about">
	<div class="rich">
		<RichPresence />
	</div>
	<div class="text">
		<h2>bio</h2>
		<p>
			Hello funny people in my screen :&#93; I'm a <Tooltip tip={age}
				><span>{Math.floor(Number(age))}</span></Tooltip
			> year old digital artist and graphic/UI designer based in Canada. I’ve taken art seriously since
			<span>2017</span>, and have been doodling silly anime characters since <span>2020</span>.
			Recently, however, I’ve grown a knack for programming. I like contributing to
			<Tooltip tip="🤓"
				><a href="https://github.com/xafn" target="_blank"><span>open source</span></a></Tooltip
			> as a web developer, which is probably the reason why you've ended up here. Currently struggling
			with Svelte and Typescript.
		</p>
	</div>
</section>

<style>
	section {
		margin-bottom: 6rem;
		display: grid;
		gap: 3.5rem;
		grid-template-columns: 1fr 1fr;
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
		color: var(--yellow);
		padding: 0.2rem 0.5rem 0.2rem;
		width: fit-content;
	}

	a {
		text-decoration: none;
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
		section {
			display: flex;
			flex-direction: column;
			align-items: normal;
		}

		h2 {
			display: block;
		}
	}
</style>
