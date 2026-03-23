let sharedAudioCtx: AudioContext | null = null;
const bufferCache = new Map<string, Promise<AudioBuffer>>();

function clampVolume(volume: number) {
	return Math.max(0, Math.min(volume, 1));
}

function getSharedAudioContext() {
	if (typeof window === 'undefined' || !('AudioContext' in window)) {
		return null;
	}

	sharedAudioCtx ??= new window.AudioContext();
	return sharedAudioCtx;
}

async function getDecodedBuffer(src: string, audioCtx: AudioContext) {
	const cached = bufferCache.get(src);
	if (cached) {
		return cached;
	}

	const next = fetch(src)
		.then((res) => res.arrayBuffer())
		.then((audioData) => audioCtx.decodeAudioData(audioData));

	bufferCache.set(src, next);
	return next;
}

export async function playSharedSFX(src: string, volume = 1) {
	const safeVolume = clampVolume(volume);
	const audioCtx = getSharedAudioContext();

	if (!audioCtx) {
		const fallback = new Audio(src);
		fallback.volume = safeVolume;
		await fallback.play().catch(() => null);
		return;
	}

	await audioCtx.resume().catch(() => null);

	const buffer = await getDecodedBuffer(src, audioCtx);
	const source = audioCtx.createBufferSource();
	const gainNode = audioCtx.createGain();

	gainNode.gain.value = safeVolume;
	source.buffer = buffer;
	source.connect(gainNode);
	gainNode.connect(audioCtx.destination);
	source.start(0);
}
