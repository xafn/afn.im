<script lang="ts">
	// look away
	import { onMount } from 'svelte';
	let activity = 'afn#0128',
		details = 'Fetching...',
		state = '',
		activityImage = 'default.webp',
		smallImage = '',
		pulse = 30000,
		isSpotify: boolean,
		isActivity: boolean,
		songLink: string,
		progress: number,
		elapsed: string;

	let calculateMusicProgress: () => void,
		calculateElapsedTime: () => void,
		calculateCurrentTime: () => void;

	let images = {
		'CLIP STUDIO PAINT': 'https://i.imgur.com/IUVs3RB.png'
	};

	function msToTime(ms: number): string {
		let seconds: string | number = Math.floor((ms / 1000) % 60),
			minutes: string | number = Math.floor((ms / (1000 * 60)) % 60),
			hours: string | number = Math.floor((ms / (1000 * 60 * 60)) % 24);

		seconds = seconds < 10 ? '0' + seconds : seconds;
		minutes = minutes < 10 ? '0' + minutes : minutes;
		hours = hours < 10 ? '0' + hours : hours;

		return hours > 0 ? hours + ':' + minutes + ':' + seconds : minutes + ':' + seconds;
	}

	calculateCurrentTime = () =>
		(state = new Date().toLocaleTimeString('en-US', { timeZone: 'America/New_York' }));

	calculateCurrentTime();
	setInterval(() => {
		if (!isActivity) {
			calculateCurrentTime();
		}
	}, 1000);

	onMount(() => {
		const connect = () => {
			let lanyard: WebSocket = new WebSocket('wss://api.lanyard.rest/socket');
			lanyard.onopen = () => console.log('Synced with Discord rich presence!');

			lanyard.onmessage = (e) => {
				let data = JSON.parse(e.data);

				switch (data.op) {
					case 1: {
						pulse = data.d.heartbeat_interval;
						lanyard.send(
							JSON.stringify({
								op: 2,
								d: { subscribe_to_id: '420043923822608384' }
							})
						);
						break;
					}

					case 0: {
						isSpotify = data.d.listening_to_spotify;
						isActivity = !!data.d.activities[0];

						if (isSpotify) {
							({
								song: activity,
								artist: details,
								album: state,
								album_art_url: activityImage
							} = data.d.spotify);

							details = 'by ' + details.replace(/;/g, ','); // why does lanyard use ; guhh??
							state = activity === state ? '' : 'on ' + state; // checking if the song is a single
							songLink = `https://open.spotify.com/track/${data.d.spotify.track_id}`;
							smallImage = '';

							calculateMusicProgress = () => {
								let spotifyTotal = data.d.spotify.timestamps.end - data.d.spotify.timestamps.start;
								progress =
									100 -
									(100 * (data.d.spotify.timestamps.end - new Date().getTime())) / spotifyTotal;
							};

							calculateMusicProgress();
							setInterval(() => {
								if (isSpotify) {
									calculateMusicProgress();
								}
							}, 1000);
						} else if (isActivity) {
							({ name: activity, details, state } = data.d.activities[0]);

							activityImage = data.d.activities[0].assets
								? `https://cdn.discordapp.com/app-assets/${data.d.activities[0].application_id}/${data.d.activities[0].assets.large_image}.webp?size=512`
								: images[activity] || 'question_mark.png';

							// WHAT IS THIS SOMEONE HELP HOW DO I NOT DO THIS I TRIED EVERYTHING RIUHFSDUIHS
							try {
								if (data.d.activities[0].assets.small_image) {
									smallImage = `https://cdn.discordapp.com/app-assets/${data.d.activities[0].application_id}/${data.d.activities[0].assets.small_image}.webp?size=512`;
								} else {
									smallImage = '';
								}
							} catch (err) {
								smallImage = '';
							}

							calculateElapsedTime = () => {
								let elapsedMs = new Date().getTime() - data.d.activities[0].timestamps.start;
								elapsed = msToTime(elapsedMs) + ' elapsed';
							};

							calculateElapsedTime();
							setInterval(() => {
								if (isActivity) {
									calculateElapsedTime();
								}
							}, 1000);
						} else if (isActivity === false) {
							activity = 'afn#0128';
							details =
								data.d.discord_status.charAt(0).toUpperCase() + data.d.discord_status.slice(1);
							details = details === 'Dnd' ? 'Do Not Disturb' : details;
							activityImage = 'default.webp';
							smallImage = '';

							calculateCurrentTime();
							setInterval(() => {
								if (!isActivity) {
									calculateCurrentTime();
								}
							}, 1000);
						}
						break;
					}
				}
			};

			setInterval(() => {
				lanyard.send(JSON.stringify({ op: 3 }));
			}, pulse);

			lanyard.onclose = () => {
				lanyard.close();
				setTimeout(function () {
					connect();
				}, 2500);
			};
		};
		connect();
	});
</script>

<div class="contain">
	<h5>activity</h5>
	<div>
		<img src={activityImage} alt={activity} class="big" class:spin={isSpotify} />
		{#if smallImage}
			<img src={smallImage} alt={activity} class="small" />
		{/if}

		<section>
			{#if isSpotify}
				<a href={songLink} target="_blank">
					<h4>{activity}</h4>
				</a>
			{:else}
				<h4>{activity}</h4>
			{/if}

			<h2>{details || ''}</h2>
			<h2>{state || ''}</h2>

			{#if isSpotify}
				<progress max="100" value={progress} />
			{:else if isActivity}
				<h2>{elapsed}</h2>
			{/if}
		</section>
	</div>
</div>

<style>
	.contain {
		display: flex;
		justify-content: left;
		align-content: left;
		flex-direction: column;
	}

	a,
	a:not(:hover) {
		text-decoration: underline;
		text-decoration-color: var(--bg-color);
		transition: 0.3s var(--bezier-one);
	}

	a:hover {
		text-decoration-color: var(--white);
	}

	h5 {
		display: none;
	}

	div > div {
		display: flex;
		gap: 2.25rem;
		align-items: center;
	}

	h4 {
		font-weight: 500;
		font-size: 1.4rem;
	}

	h2 {
		font-size: 1.15rem;
	}

	.big {
		height: 135px;
		width: 135px;
		border-radius: 20px;
		display: inline-block;
		opacity: 1;
		user-select: none;
		transition: all 0.3s var(--bezier-one);
	}

	.small {
		height: 40px;
		width: 40px;
		border-radius: 50%;
		position: absolute;
		transform: translate(275%, 150%);
		outline: 6px solid var(--bg-color);
		outline-offset: -1px;
		background-color: var(--bg-color);
	}

	progress {
		-webkit-appearance: none;
		border: 0;
		border-radius: 10rem;
		margin: 0;
		margin-top: 0.6rem;
	}

	progress::-webkit-progress-bar {
		background-color: var(--grey-one);
		border-radius: 1rem;
		transform: translateY(0.2rem);
		height: 0.6rem;
	}

	progress[value]::-webkit-progress-value {
		background-color: var(--yellow);
		border-radius: 10rem;
	}

	progress[value]::-moz-progress-bar {
		background-color: var(--yellow);
		border-radius: 10rem;
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.spin {
		animation: rotate 40s linear infinite;
		border-radius: 50%;
	}

	@media screen and (max-width: 868px) {
		div {
			justify-content: left;
		}

		h2 {
			font-size: 1rem;
		}

		h4 {
			font-size: 1.2rem;
		}

		h5 {
			display: inline-block;
			margin-bottom: 0.5rem;
		}

		.big {
			height: 100px;
			width: 100px;
			border-radius: 17px;
		}

		.spin {
			border-radius: 50%;
		}

		.small {
			transform: translate(190%, 110%);
		}
	}
</style>
