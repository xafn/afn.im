<script lang="ts">
	import { onMount } from 'svelte';
	import type { User } from '@supabase/supabase-js';
	import Tooltip from '../atoms/Tooltip.svelte';
	import Socials from '../molecules/Socials.svelte';
	import SignatureModal from '../molecules/SignatureModal.svelte';
	import SignatureWall from '../molecules/SignatureWall.svelte';
	import { supabase } from '../../util/supabase';
	import type { FooterSignature, SignaturePayload } from '../../util/types';
	import {
		buildAuthRedirectUrl,
		clearLocationHash,
		consumeSignQueryFlag,
		extractSessionTokensFromHash,
		hasSignIntent,
		readAuthCallbackError,
		setSignIntent
	} from '../../util/authHelpers';
	import { FOOTER_ERRORS } from '../../util/constants';
	import {
		insertFooterSignature,
		loadFooterSignatures,
		userHasSignature
	} from '../../util/signatureService';

	let modalOpen = false;
	let saving = false;
	let loading = true;
	let errorMessage = '';
	let signatures: FooterSignature[] = [];
	let currentUser: User | null = null;
	let hasSignedWithCurrentUser = false;
	let authWaiting = false;

	$: wallErrorMessage = modalOpen ? '' : errorMessage;
	$: hideAddSignatureButton = Boolean(currentUser && hasSignedWithCurrentUser);

	onMount(() => {
		let unsubscribeAuth: (() => void) | null = null;

		const setup = async () => {
			await loadSignatures();

			if (!supabase) {
				return;
			}

			await finalizeAuthFromUrl();
			await refreshSession();
			await syncUserSignatureStatus();

			if (typeof window !== 'undefined') {
				const callbackError = readAuthCallbackError();
				if (callbackError) {
					errorMessage = callbackError;
				}
				const wantsSigning = consumeSignQueryFlag() || hasSignIntent();
				if (wantsSigning) {
					focusSignatureWall();

					authWaiting = true;
					const hydrated = await waitForSessionHydration();
					if (!currentUser) {
						authWaiting = false;
						if (!hydrated) {
							setSignIntent(false);
						}
						if (!errorMessage) {
							errorMessage = FOOTER_ERRORS.AUTH_FINISH_LOGIN;
						}
					}

					if (currentUser && !hasSignedWithCurrentUser) {
						authWaiting = false;
						setSignIntent(false);
						modalOpen = true;
					} else if (currentUser && hasSignedWithCurrentUser) {
						authWaiting = false;
						setSignIntent(false);
						errorMessage = FOOTER_ERRORS.ALREADY_SIGNED;
					}
				}
			}

			const auth = supabase.auth.onAuthStateChange((_event, sessionChange) => {
				const justSignedIn = Boolean(sessionChange?.user);
				currentUser = sessionChange?.user ?? null;
				if (currentUser) {
					authWaiting = false;
				}

				void (async () => {
					await syncUserSignatureStatus();
					if (justSignedIn && currentUser && !hasSignedWithCurrentUser && hasSignIntent()) {
						focusSignatureWall();
						setSignIntent(false);
						modalOpen = true;
					}
				})();
			});

			unsubscribeAuth = () => auth.data.subscription.unsubscribe();
		};

		void setup();

		return () => {
			unsubscribeAuth?.();
		};
	});

	async function openModal() {
		errorMessage = '';

		if (!supabase) {
			errorMessage = FOOTER_ERRORS.SUPABASE_NOT_CONFIGURED;
			return;
		}

		await refreshSession();
		if (currentUser && authWaiting) {
			authWaiting = false;
		}

		if (!currentUser) {
			authWaiting = true;
			await signInWithGoogle();
			return;
		}

		if (hasSignedWithCurrentUser) {
			errorMessage = FOOTER_ERRORS.ALREADY_SIGNED;
			setSignIntent(false);
			return;
		}

		setSignIntent(false);
		modalOpen = true;
	}

	function closeModal() {
		modalOpen = false;
		errorMessage = '';
	}

	async function signInWithGoogle() {
		if (!supabase || typeof window === 'undefined') return;

		const redirectTo = buildAuthRedirectUrl();
		if (!redirectTo) return;
		setSignIntent(true);

		const { error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo,
				queryParams: { prompt: 'select_account' }
			}
		});

		if (error) {
			authWaiting = false;
			setSignIntent(false);
			if (error.message.toLowerCase().includes('unsupported provider')) {
				errorMessage = FOOTER_ERRORS.GOOGLE_PROVIDER_DISABLED;
				return;
			}

			errorMessage = error.message;
		}
	}

	async function finalizeAuthFromUrl() {
		if (!supabase || typeof window === 'undefined') return;
		const url = new URL(window.location.href);
		const code = url.searchParams.get('code');

		if (code) {
			const { error } = await supabase.auth.exchangeCodeForSession(code);
			if (error) {
				errorMessage = error.message;
			}
			return;
		}

		const tokens = extractSessionTokensFromHash();
		if (tokens) {
			const { error } = await supabase.auth.setSession({
				access_token: tokens.accessToken,
				refresh_token: tokens.refreshToken
			});

			if (error) {
				errorMessage = error.message;
				return;
			}

			clearLocationHash();
		}
	}

	async function refreshSession() {
		if (!supabase) return;
		const {
			data: { session },
			error
		} = await supabase.auth.getSession();

		if (error) {
			errorMessage = error.message;
			return;
		}

		currentUser = session?.user ?? null;

		if (!currentUser) {
			const {
				data: { user },
				error: userError
			} = await supabase.auth.getUser();

			if (user) {
				currentUser = user;
			}

			if (userError && !/session|jwt|auth session/i.test(userError.message)) {
				errorMessage = userError.message;
			}
		}
	}

	async function waitForSessionHydration() {
		for (let i = 0; i < 20; i += 1) {
			await refreshSession();
			if (currentUser) {
				await syncUserSignatureStatus();
				return true;
			}
			await new Promise((resolve) => setTimeout(resolve, 250));
		}

		return false;
	}

	function focusSignatureWall() {
		if (typeof window === 'undefined') return;
		window.requestAnimationFrame(() => {
			document
				.getElementById('signature-wall')
				?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		});
	}

	async function syncUserSignatureStatus() {
		if (!supabase || !currentUser) {
			hasSignedWithCurrentUser = false;
			return;
		}

		try {
			hasSignedWithCurrentUser = await userHasSignature(supabase, currentUser.id);
		} catch (error: unknown) {
			authWaiting = false;
			hasSignedWithCurrentUser = false;
			errorMessage = error instanceof Error ? error.message : String(error);
			return;
		}
		authWaiting = false;
	}

	async function loadSignatures() {
		loading = true;
		errorMessage = '';

		if (!supabase) {
			errorMessage = FOOTER_ERRORS.SUPABASE_NOT_CONFIGURED;
			loading = false;
			return;
		}

		try {
			signatures = await loadFooterSignatures(supabase);
		} catch (error: unknown) {
			errorMessage = error instanceof Error ? error.message : String(error);
			signatures = [];
		}
		loading = false;
	}

	async function submitSignature(event: CustomEvent<SignaturePayload>) {
		saving = true;
		errorMessage = '';

		try {
			if (!supabase) {
				throw new Error(FOOTER_ERRORS.SUPABASE_NOT_CONFIGURED_SESSION);
			}

			if (!currentUser) {
				throw new Error(FOOTER_ERRORS.AUTH_REQUIRED);
			}

			if (hasSignedWithCurrentUser) {
				throw new Error(FOOTER_ERRORS.ALREADY_SIGNED);
			}

			await insertFooterSignature(supabase, currentUser.id, event.detail);

			hasSignedWithCurrentUser = true;
			await loadSignatures();
			modalOpen = false;
		} catch (error: unknown) {
			errorMessage = error instanceof Error ? error.message : FOOTER_ERRORS.SAVE_FAILED;
		} finally {
			saving = false;
		}
	}
</script>

<hr />

<SignatureWall
	{signatures}
	{loading}
	errorMessage={wallErrorMessage}
	supabaseConnected={Boolean(supabase)}
	{authWaiting}
	hideAddButton={hideAddSignatureButton}
	on:open={openModal}
/>

<footer class="wrapper">
	<Socials />
	<h6 class="footer-meta">
		Made with pain. &#60;3
		<Tooltip tip="you're here"><span>V2</span></Tooltip>
		<Tooltip tip="how to delete">
			<a href="https://v1.afn.im/" target="_blank" rel="noreferrer">V1</a>
		</Tooltip>
	</h6>
</footer>

<SignatureModal
	open={modalOpen}
	{saving}
	{errorMessage}
	signedInEmail={currentUser?.email ?? ''}
	on:close={closeModal}
	on:submit={submitSignature}
/>

<style lang="scss">
	hr {
		background-color: var(--elevation-one);
		height: 1px;
		border: 0;
		width: 100%;
		margin-bottom: 4rem;

		@media screen and (max-width: 768px) {
			margin-bottom: 3rem;
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

	.footer-meta {
		text-align: center;
		line-height: 2.5rem;
		margin-top: 0;
	}

	.footer-meta span {
		font-family: var(--font-two);
		background-color: var(--elevation-one);
		border-radius: 7px;
		padding: 0.15rem 0.5rem 0.15rem;
		width: fit-content;
		margin-left: 1rem;
		margin-right: 0.4rem;
	}

	.footer-meta a {
		transition: 0.3s var(--bezier-one);
		font-family: var(--font-two);
		text-decoration: none;
		color: var(--text-secondary);
		font-size: 0.9rem;
		border-radius: 7px;
		padding: 0.15rem 0.5rem 0.15rem;

		&:hover {
			font-weight: 400;
			background-color: var(--accent);
			color: var(--elevation-one);
			border-radius: 7px;
			width: fit-content;
		}
	}
</style>
