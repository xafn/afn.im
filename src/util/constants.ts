export const SIGNATURE_TABLE = 'footer_signatures';
export const SIGNATURE_FETCH_LIMIT = 120;

export const SIGNATURE_NAME_MAX = 36;
export const SIGNATURE_MESSAGE_MAX = 40;
export const SIGNATURE_DATA_PREFIX = 'data:image/png;base64,';
export const SIGNATURE_MIN_DATA_LENGTH = 120;

export const SIGN_INTENT_KEY = 'footer-sign-intent';

export const FOOTER_ERRORS = {
	SUPABASE_NOT_CONFIGURED:
		'Supabase is not configured. Add PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY, then restart dev server.',
	SUPABASE_NOT_CONFIGURED_SESSION:
		'Supabase is not configured in this session. Restart dev server to load env vars.',
	AUTH_REQUIRED: 'Please sign in with Google before placing a signature.',
	ALREADY_SIGNED: 'You already placed a signature with this account.',
	GOOGLE_PROVIDER_DISABLED:
		'Google auth is disabled in Supabase. Enable Google provider in Authentication → Providers, then try again.',
	AUTH_FINISH_LOGIN: 'Finish Google login, then click Add your signature.',
	NAME_REQUIRED: 'Name is required.',
	SIGNATURE_REQUIRED: 'Signature is required.',
	SIGNATURE_TOO_SHORT: 'Signature is too short. Please sign inside the pad.',
	INVALID_SIGNATURE_REJECTED:
		'Invalid signature payload rejected by backend (blank name or signature).',
	INSERT_POLICY_BLOCKED:
		'Save blocked by database policy. Ensure INSERT policy allows authenticated users and checks auth.uid() = user_id.',
	MISSING_USER_ID_COLUMN:
		'Database is missing footer_signatures.user_id. Add a user_id UUID column and unique constraint for one signature per account.',
	SAVE_FAILED: 'Could not save signature right now.'
} as const;
