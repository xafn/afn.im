<script>
	import { onMount } from 'svelte';
	import moment from 'moment-timezone';

	let data;

	let activity = 'afn#0001';
	let details = 'Fetching...';
	let state = '';
	let activityImage = 'default.webp';
	let smallImage = '';

	let pulse = 30000;
	let isSpotify = false;
	let isActivity = false;
	let progress = 0;
	let elapsed;
	let spotifyTotal = 0;
	let time;
	let songLink = '';

	let calculateMusicProgress;
	let calculateElapsedTime;
	let calculateCurrentTime;

	onMount(() => {
		const connect = () => {
			let lanyard = new WebSocket('wss://api.lanyard.rest/socket');

			lanyard.onopen = () => console.log('Established websocket connection!');

			lanyard.onmessage = (e) => {
				data = JSON.parse(e.data);
				console.log(data);

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
							details = `by ${details.replace(/;/g, ',')}`; //why does lanyard use ; guhh??
							state = activity === state ? '' : `on ${state}`; //checking if the song is a single
							songLink = `https://open.spotify.com/track/${data.d.spotify.track_id}`;
							smallImage = '';

							spotifyTotal = data.d.spotify.timestamps.end - data.d.spotify.timestamps.start;
							calculateMusicProgress = () => {
								progress = 100 - (100 * (data.d.spotify.timestamps.end - new Date().getTime())) / spotifyTotal;
							};

							// going to make this not shit soon tm
							calculateMusicProgress();
							setInterval(() => {
								if (isSpotify) {
									calculateMusicProgress();
								}
							}, 1000);
						} 
                        
                        else if (isActivity) {
							({ name: activity, details, state } = data.d.activities[0]);
							activityImage = `https://cdn.discordapp.com/app-assets/${data.d.activities[0].application_id}/${data.d.activities[0].assets.large_image}.webp?size=512`;
							smallImage = `https://cdn.discordapp.com/app-assets/${data.d.activities[0].application_id}/${data.d.activities[0].assets.small_image}.webp?size=512` || '';

							calculateElapsedTime = () => {
								elapsed = new Date().getTime() - data.d.activities[0].timestamps.start;
								elapsed = moment.utc(elapsed).format(elapsed > 3600000 ? 'HH:mm:ss' : 'mm:ss');
								elapsed = `${elapsed} elapsed`;
							};

							calculateElapsedTime();
							setInterval(() => {
								if (isActivity) {
									calculateElapsedTime();
								}
							}, 1000);
						} 
                        
                        else if (isActivity === false) {
							activity = 'afn#0001';
							details = data.d.discord_status.charAt(0).toUpperCase() + data.d.discord_status.slice(1).toLowerCase();
							details = details === 'Dnd' ? 'Do Not Disturb' : details;
							calculateCurrentTime = () => {
								time = moment().tz('America/New_York').format('hh:mm:ss A');
								state = time;
                            };

							calculateCurrentTime();
							setInterval(() => {
								if (!isActivity) {
									calculateCurrentTime();
								}
							}, 1000);

							activityImage = 'default.webp';
							smallImage = '';
						}
						break;
					}
				}
			};

			setInterval(() => {
				lanyard.send(JSON.stringify({ op: 3 }));
			}, pulse);

			lanyard.onclose = () => {
				lanyard = null;
				setTimeout(function () {
					connect();
				}, 5000);
			};
		};

		connect();
	});
</script>

<div class="contain">
	<h5>activity</h5>
	<div>
		<img src={activityImage} alt={activity} class="big {isSpotify ? 'spin' : ''}" />

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
			{:else}
				<h2>{isActivity ? elapsed : ''}</h2>
			{/if}

		</section>
	</div>
</div>

<style>
	.contain {
		display: flex;
		flex-direction: column;
		justify-content: left;
		align-content: left;
	}

	a:hover {
		text-decoration: underline;
		text-decoration-color: var(--white);
		transition: 0.4s var(--bezier-one);
	}

	a,
	a:not(:hover) {
		text-decoration: underline;
		text-decoration-color: var(--bg-color);
		transition: 0.2s var(--bezier-one);
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
		width: auto;
		border-radius: 20px;
		display: inline-block;
		opacity: 1;
		user-select: none;
	}

	.small {
		height: 40px;
		width: auto;
		border-radius: 50%;
		position: absolute;
		transform: translate(275%, 150%);
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
			transform: translate(200%, 125%);
		}
	}
</style>
