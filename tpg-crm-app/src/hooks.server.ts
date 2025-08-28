import { redirect, type Handle } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';

const handleAuth: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get(auth.sessionCookieName);

	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		if (event.url.pathname.startsWith('/dashboard')) {
			throw redirect(302, '/login');
		}
		return resolve(event);
	}

	const { session, user } = await auth.validateSessionToken(sessionToken);

	if (session) {
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} else {
		auth.deleteSessionTokenCookie(event);
	}

	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
};

const handleLogout: Handle = async ({ event, resolve }) => {
	if (event.url.pathname === '/logout') {
		if (event.locals.session) {
			await auth.invalidateSession(event.locals.session.id);
			auth.deleteSessionTokenCookie(event);
		}
		throw redirect(302, '/login');
	}
	return resolve(event);
};

export const handle: Handle = async ({ event, resolve }) => {
	// Skip auth and logout handling for POST requests to /login to prevent body consumption issues
	if (event.request.method === 'POST' && event.url.pathname === '/login') {
		return resolve(event);
	}

	const response = await handleAuth({ event, resolve });
	return handleLogout({ event, resolve: () => resolve(event, { transformPageChunk: ({ html }) => html }) });
};
