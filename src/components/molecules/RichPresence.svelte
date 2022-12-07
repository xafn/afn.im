<script lang="ts">
	import { onMount } from 'svelte';
	import Tooltip from '../atoms/Tooltip.svelte';

	import { user } from '../../util/discord';
	import type { Spotify } from '../../util/types';

	let activity = user.fullName(),
		details = 'Fetching...',
		activityImage = 'default.webp',
		pulse = 30000,
		state: string,
		smallImage: string,
		isSpotify: boolean,
		isActivity: boolean,
		songLink: string,
		progress: number,
		elapsed: string,
		spotifyTotal: number,
		currentSetInterval: ReturnType<typeof setInterval>;

	let images: { [key: string]: string } = {
		'CLIP STUDIO PAINT': 'https://i.imgur.com/IUVs3RB.png'
	};

	function localTime() {
		state = new Date().toLocaleTimeString('en-US', { timeZone: 'America/New_York' });
	}

	function musicProgress(spotify: Spotify) {
		progress = 0;
		spotifyTotal = spotify.timestamps.end - spotify.timestamps.start;
		progress = 100 - (100 * (spotify.timestamps.end - new Date().getTime())) / spotifyTotal;
	}

	function elapsedTime(timestampStart: number) {
		let elapsedMs = new Date().getTime() - timestampStart;
		// shrimple but hacky way of getting time from ms
		elapsed = new Date(elapsedMs).toISOString().slice(11, 19) + ' elapsed';
		if (elapsed.slice(0, 2) === '00') {
			elapsed = elapsed.slice(-13);
		}
		if (elapsed.slice(0, 1) === '0' && elapsed.slice(1, 2) != '0') {
			elapsed = elapsed.slice(-12);
		}
	}

	localTime();
	currentSetInterval = setInterval(() => localTime(), 1000);

	onMount(() => {
		let lanyard: WebSocket = new WebSocket('wss://api.lanyard.rest/socket');
		lanyard.onopen = () => console.log('Synced with Discord rich presence!');

		lanyard.onmessage = (e) => {
			let opcode = JSON.parse(e.data).op;
			let data = JSON.parse(e.data).d;

			if (opcode === 1) {
				pulse = data.heartbeat_interval;
				lanyard.send(
					JSON.stringify({
						op: 2,
						d: { subscribe_to_id: user.id }
					})
				);
			}

			setInterval(() => {
				lanyard.send(JSON.stringify({ op: 3 }));
			}, pulse);

			if (opcode === 0) {
				isSpotify = data.listening_to_spotify;
				isActivity = !!data.activities[0];

				if (isSpotify) {
					({
						song: activity,
						artist: details,
						album: state,
						album_art_url: activityImage
					} = data.spotify);

					details = 'by ' + details.replace(/;/g, ','); // why does lanyard use ; guhh??
					state = activity === state ? '' : 'on ' + state; // checking if the song is a single
					songLink = `https://open.spotify.com/track/${data.spotify.track_id}`;
					smallImage = '';

					musicProgress(data.spotify);
					clearInterval(currentSetInterval);
					currentSetInterval = setInterval(() => musicProgress(data.spotify), 1000);
				} else if (isActivity) {
					({ name: activity, details, state } = data.activities[0]);

					elapsedTime(data.activities[0].timestamps.start);
					clearInterval(currentSetInterval);
					currentSetInterval = setInterval(() => {
						elapsedTime(data.activities[0].timestamps.start);
					}, 1000);

					activityImage = data.activities[0].assets
						? `https://cdn.discordapp.com/app-assets/${data.activities[0].application_id}/${data.activities[0].assets.large_image}.webp?size=512`
						: images[activity] || 'question_mark.png';

					smallImage = '';
					if (data.activities[0].assets.small_image) {
						smallImage = `https://cdn.discordapp.com/app-assets/${data.activities[0].application_id}/${data.activities[0].assets.small_image}.webp?size=512`;
					}
				} else if (!isActivity) {
					activity = user.fullName();
					details = data.discord_status.charAt(0).toUpperCase() + data.discord_status.slice(1);
					details = details === 'Dnd' ? 'Do Not Disturb' : details;
					activityImage = 'default.webp';
					smallImage = '';

					localTime();
					clearInterval(currentSetInterval);
					currentSetInterval = setInterval(() => localTime(), 1000);
				}
			}
		};
	});
</script>

<h2>activity</h2>
<div class="contain">
	<img src={activityImage} alt={activity} class="big" class:spin={isSpotify} />
	{#if smallImage}
		<img src={smallImage} alt={activity} class="small" />
	{/if}
	<div>
		{#if isSpotify}
			<Tooltip tip="Open Spotify">
				<a href={songLink} target="_blank" rel="noreferrer">
					<h5>{activity}</h5>
				</a>
			</Tooltip>
		{:else}
			<h5>{activity}</h5>
		{/if}
		<h6>{details || ''}</h6>
		<h6>{state || ''}</h6>
		{#if isSpotify}
			<progress max="100" value={progress} />
		{:else if isActivity}
			<h6>{elapsed}</h6>
		{/if}
	</div>
</div>

<style>
	.contain {
		display: flex;
		gap: 2.25rem;
		align-items: center;
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
		-moz-appearance: none;
		appearance: none;
		border: 0;
		border-radius: 10rem;
		margin: 0;
		margin-top: 0.6rem;
		background-color: var(--grey-one);
		height: 0.6rem;
		overflow: hidden;
	}

	progress::-webkit-progress-bar {
		background-color: var(--grey-one);
		border-radius: 10rem;
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
