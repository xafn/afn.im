function stableHash(seed: number, source: string) {
	let hash = seed;
	for (let i = 0; i < source.length; i += 1) {
		hash = (hash * 33 + source.charCodeAt(i)) | 0;
	}
	return Math.abs(hash);
}

function normalizeId(signatureId: string | null | undefined, fallback: string) {
	return String(signatureId ?? fallback);
}

export function getSignatureRotation(signatureId: string | null | undefined): number {
	const hash = stableHash(17, normalizeId(signatureId, 'signature-rotation'));
	return ((hash % 15) - 7) * 0.9;
}

export function getSignatureOrder(signatureId: string | null | undefined): number {
	const hash = stableHash(23, normalizeId(signatureId, 'signature-order'));
	return hash % 10000;
}

export function getSignatureInkOpacity(signatureId: string | null | undefined): number {
	const hash = stableHash(29, normalizeId(signatureId, 'signature-opacity'));
	const normalized = (hash % 100) / 100;
	return Number((0.72 + normalized * 0.2).toFixed(2));
}
