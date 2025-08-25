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

<section id="about" class="wrapper">
	<div>
		<RichPresence />
	</div>
	<div class="text">
		<h2>bio</h2>
		<p>
			Hey there, I'm <Tooltip tip="short for affan">
				<span>afn!</span>
			</Tooltip> :] I'm a <Tooltip tip={age}><span>{Math.floor(Number(age))}</span></Tooltip>
			year old digital artist and designer based in Canada. I’ve taken art seriously since
			<span>2017</span>, and have been doodling silly anime characters since <span>2020</span>. I
			also started to pivot into some programming, which landed me to study at the <Tooltip
				tip="stay tuned for my WatCard progression"
			>
				<a href="https://cs.uwaterloo.ca/" target="_blank" rel="noreferrer">
					<span>University of Waterloo</span>
				</a>
			</Tooltip>for computer science. In my free time, I like to contribute to
			<Tooltip tip="🤓">
				<a href="https://github.com/xafn" target="_blank" rel="noreferrer">
					<span>open source</span>
				</a>
			</Tooltip>
			as a web developer. I'm most notable for working on <Tooltip tip="<3">
				<a href="https://revanced.app" target="_blank" rel="noreferrer">
					<span>ReVanced</span>
				</a>
			</Tooltip>, which is probably how you found me here.
		</p>
	</div>
</section>

<style lang="scss">
	@import '../../styles/mixins.scss';

	section {
		margin-bottom: 6rem;
		display: grid;
		gap: 4.5rem;
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
		background-color: var(--elevation-one);
		border-radius: 7px;
		color: var(--accent);
		padding: 0.2rem 0.5rem 0.2rem;
		width: fit-content;
	}

	a {
		text-decoration: none;
	}

	.text::before {
		@include outlineText(
			$content: 'afn',
			$translateX: 97%,
			$translateY: -5%,
			$fontSize: 300px,
			$opacity: 0.22
		);
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
			margin-bottom: 1rem;
		}
	}
</style>
