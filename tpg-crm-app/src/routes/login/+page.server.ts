import { hash, verify } from '@node-rs/argon2';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';
import type { RequestEvent } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/dashboard');
	}
	return {};
};

const loginUser = async (event: RequestEvent, formData: FormData) => {
	console.log('Backend: loginUser function called');
	const username = formData.get('username');
	const password = formData.get('password');

	console.log('Backend: Login attempt for username:', username);

	if (!validateUsername(username)) {
		console.log('Backend: Login - Invalid username format');
		return fail(400, { message: 'Invalid username (min 3, max 31 characters, alphanumeric only)' });
	}
	if (!validatePassword(password)) {
		console.log('Backend: Login - Invalid password format');
		return fail(400, { message: 'Invalid password (min 6, max 255 characters)' });
	}

	const results = await db
		.select()
		.from(table.user)
		.where(eq(table.user.username, username));

	const existingUser = results.at(0);
	if (!existingUser) {
		console.log('Backend: Login - User not found');
		return fail(400, { message: 'Incorrect username or password' });
	}

	const validPassword = await verify(existingUser.passwordHash, password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1,
	});
	if (!validPassword) {
		console.log('Backend: Login - Invalid password');
		return fail(400, { message: 'Incorrect username or password' });
	}

	console.log('Backend: Login successful for user:', existingUser.id);
	const sessionToken = auth.generateSessionToken();
	const session = await auth.createSession(sessionToken, existingUser.id);
	auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

	return redirect(302, '/dashboard');
};

const registerUser = async (event: RequestEvent, formData: FormData) => {
	console.log('Backend: registerUser function called');
	const username = formData.get('username');
	const password = formData.get('password');

	console.log('Backend: Registration attempt for username:', username);

	if (!validateUsername(username)) {
		console.log('Backend: Registration - Invalid username format');
		return fail(400, { message: 'Invalid username' });
	}
	if (!validatePassword(password)) {
		console.log('Backend: Registration - Invalid password format');
		return fail(400, { message: 'Invalid password' });
	}

	const userId = generateUserId();
	const passwordHash = await hash(password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1,
	});

	try {
		console.log('Backend: Attempting to insert new user into DB:', { id: userId, username });
		await db.insert(table.user).values({ id: userId, username, passwordHash });
		console.log('Backend: User registered successfully:', userId);

		const sessionToken = auth.generateSessionToken();
		const session = await auth.createSession(sessionToken, userId);
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
		console.log('Backend: Session created and cookie set for user:', userId);
	} catch (e) {
		console.error('Backend: Registration error:', e);
		return fail(500, { message: 'An error has occurred' });
	}
	return redirect(302, '/dashboard');
};

export const actions: Actions = {
	authenticate: async (event) => {
		console.log('Backend: Authenticate action called');
		const formData = await event.request.formData();
		const actionType = formData.get('actionType');
		console.log('Backend: Action type received:', actionType);

		if (actionType === 'login') {
			return loginUser(event, formData);
		} else if (actionType === 'register') {
			return registerUser(event, formData);
		} else {
			console.log('Backend: Invalid action type:', actionType);
			return fail(400, { message: 'Invalid action' });
		}
	}
};

function generateUserId() {
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	const id = encodeBase32LowerCase(bytes);
	console.log('Backend: Generated user ID:', id);
	return id;
}

function validateUsername(username: unknown): username is string {
	const isValid =
		typeof username === 'string' &&
		username.length >= 3 &&
		username.length <= 31 &&
		/^[a-z0-9_-]+$/.test(username);
	console.log('Backend: Validating username:', username, 'Result:', isValid);
	return isValid;
}

function validatePassword(password: unknown): password is string {
	const isValid =
		typeof password === 'string' &&
		password.length >= 6 &&
		password.length <= 255;
	console.log('Backend: Validating password (length check only):', typeof password === 'string' ? password.length : 'not a string', 'Result:', isValid);
	return isValid;
}