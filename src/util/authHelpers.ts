import { SIGN_INTENT_KEY } from './constants';

export function setSignIntent(active: boolean) {
	if (typeof window === 'undefined') return;
	if (active) {
		window.localStorage.setItem(SIGN_INTENT_KEY, '1');
		return;
	}
	window.localStorage.removeItem(SIGN_INTENT_KEY);
}

export function hasSignIntent() {
	if (typeof window === 'undefined') return false;
	return window.localStorage.getItem(SIGN_INTENT_KEY) === '1';
}

export function buildAuthRedirectUrl() {
	if (typeof window === 'undefined') return null;
	const redirectUrl = new URL(window.location.origin);
	redirectUrl.searchParams.set('sign', '1');
	return redirectUrl.toString();
}

export function readAuthCallbackError() {
	if (typeof window === 'undefined') return '';
	const url = new URL(window.location.href);
	const callbackError =
		url.searchParams.get('error_description') || url.searchParams.get('error') || '';
	return callbackError ? decodeURIComponent(callbackError.replace(/\+/g, ' ')) : '';
}

export function consumeSignQueryFlag() {
	if (typeof window === 'undefined') return false;
	const url = new URL(window.location.href);
	const wantsSigning = url.searchParams.get('sign') === '1';
	if (wantsSigning) {
		url.searchParams.delete('sign');
		history.replaceState({}, '', url.toString());
	}
	return wantsSigning;
}

export function extractSessionTokensFromHash() {
	if (typeof window === 'undefined') return null;
	const url = new URL(window.location.href);
	let rawHash = url.hash.startsWith('#') ? url.hash.slice(1) : url.hash;

	if (rawHash.includes('%23access_token=')) {
		rawHash = decodeURIComponent(rawHash);
	}
	if (rawHash.includes('#access_token=')) {
		rawHash = rawHash.split('#access_token=')[1];
		rawHash = `access_token=${rawHash}`;
	}

	const hashParams = new URLSearchParams(rawHash);
	const accessToken = hashParams.get('access_token');
	const refreshToken = hashParams.get('refresh_token');

	if (!accessToken || !refreshToken) return null;

	return { accessToken, refreshToken };
}

export function clearLocationHash() {
	if (typeof window === 'undefined') return;
	const url = new URL(window.location.href);
	url.hash = '';
	history.replaceState({}, '', url.toString());
}
