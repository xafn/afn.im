import type { SupabaseClient } from '@supabase/supabase-js';
import {
	FOOTER_ERRORS,
	SIGNATURE_DATA_PREFIX,
	SIGNATURE_FETCH_LIMIT,
	SIGNATURE_MIN_DATA_LENGTH,
	SIGNATURE_TABLE
} from './constants';
import type { FooterSignature, SignaturePayload } from './types';

type DatabaseErrorLike = {
	code?: string;
	message: string;
};

function asError(error: DatabaseErrorLike | null) {
	if (!error) return null;
	return new Error(error.message);
}

export function sanitizeSignaturePayload(payload: SignaturePayload) {
	const name = payload.name.trim();
	const message = payload.message?.trim() || null;
	const signature_data = payload.signature_data.trim();

	if (!name) {
		throw new Error(FOOTER_ERRORS.NAME_REQUIRED);
	}
	if (!signature_data || !signature_data.startsWith(SIGNATURE_DATA_PREFIX)) {
		throw new Error(FOOTER_ERRORS.SIGNATURE_REQUIRED);
	}
	if (signature_data.length < SIGNATURE_MIN_DATA_LENGTH) {
		throw new Error(FOOTER_ERRORS.SIGNATURE_TOO_SHORT);
	}

	return { name, message, signature_data };
}

export async function loadFooterSignatures(client: SupabaseClient): Promise<FooterSignature[]> {
	const withUser = await client
		.from(SIGNATURE_TABLE)
		.select('id, user_id, name, message, signature_data, created_at')
		.order('created_at', { ascending: false })
		.limit(SIGNATURE_FETCH_LIMIT);

	if (!withUser.error) {
		return (withUser.data as FooterSignature[]) ?? [];
	}

	if (withUser.error.code === '42703') {
		const fallback = await client
			.from(SIGNATURE_TABLE)
			.select('id, name, message, signature_data, created_at')
			.order('created_at', { ascending: false })
			.limit(SIGNATURE_FETCH_LIMIT);

		if (!fallback.error) {
			return (fallback.data as FooterSignature[]) ?? [];
		}
	}

	throw asError(withUser.error);
}

export async function userHasSignature(client: SupabaseClient, userId: string) {
	const { data, error } = await client
		.from(SIGNATURE_TABLE)
		.select('id')
		.eq('user_id', userId)
		.limit(1);

	if (error) {
		if (error.code === '42703') {
			throw new Error(FOOTER_ERRORS.MISSING_USER_ID_COLUMN);
		}
		throw asError(error);
	}

	return (data?.length ?? 0) > 0;
}

export async function insertFooterSignature(
	client: SupabaseClient,
	userId: string,
	payload: SignaturePayload
) {
	const cleanPayload = sanitizeSignaturePayload(payload);

	const { error } = await client.from(SIGNATURE_TABLE).insert({
		...cleanPayload,
		user_id: userId
	});

	if (!error) return;

	if (error.code === '23505') {
		throw new Error(FOOTER_ERRORS.ALREADY_SIGNED);
	}
	if (error.code === '23514') {
		throw new Error(FOOTER_ERRORS.INVALID_SIGNATURE_REJECTED);
	}
	if (error.code === '42501') {
		throw new Error(FOOTER_ERRORS.INSERT_POLICY_BLOCKED);
	}
	if (error.code === '42703') {
		throw new Error(FOOTER_ERRORS.MISSING_USER_ID_COLUMN);
	}

	throw asError(error);
}
