// tpg-crm-app/src/hooks.server.spec.ts
import { expect, test, vi, beforeEach } from 'vitest';
import { handle } from './hooks.server';
import { redirect } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';

// Mock external dependencies
vi.mock('$lib/server/auth');
vi.mock('@sveltejs/kit', async (importOriginal) => {
	const actual = (await importOriginal()) as Record<string, unknown>;
	return {
		...actual,
		redirect: vi.fn()
	};
});

beforeEach(() => {
	vi.clearAllMocks();
});

// Helper to create a mock event
const createMockEvent = (sessionToken: string | undefined, localsUser: any = null, localsSession: any = null, pathname: string = '/') => ({
	request: new Request('http://localhost' + pathname), // Create a dummy request object
	url: new URL('http://localhost' + pathname),
	cookies: {
		get: vi.fn(() => sessionToken),
		set: vi.fn(),
		delete: vi.fn()
	},
	locals: {
		user: localsUser,
		session: localsSession
	}
});

test('handle (auth part) sets event.locals.user and session for valid session', async () => {
	const mockUser = { id: 'user1', username: 'testuser' };
	const mockSession = { id: 'session1', userId: 'user1', expiresAt: new Date(Date.now() + 1000 * 60 * 60) };
	vi.mocked(auth.validateSessionToken).mockResolvedValue({ session: mockSession, user: mockUser });

	const mockEvent = createMockEvent('valid-token');
	const resolve = vi.fn(() => Promise.resolve(new Response())); // Mock resolve function
	await handle({ event: mockEvent as any, resolve });

	expect(mockEvent.locals.user).toEqual(mockUser);
	expect(mockEvent.locals.session).toEqual(mockSession);
	expect(auth.setSessionTokenCookie).toHaveBeenCalledWith(mockEvent, 'valid-token', mockSession.expiresAt);
	expect(resolve).toHaveBeenCalledWith(mockEvent);
});

test('handle (auth part) clears cookies and sets event.locals to null for invalid/expired session', async () => {
	vi.mocked(auth.validateSessionToken).mockResolvedValue({ session: null, user: null });

	const mockEvent = createMockEvent('invalid-token');
	const resolve = vi.fn(() => Promise.resolve(new Response()));
	await handle({ event: mockEvent as any, resolve });

	expect(mockEvent.locals.user).toBeNull();
	expect(mockEvent.locals.session).toBeNull();
	expect(auth.deleteSessionTokenCookie).toHaveBeenCalledWith(mockEvent);
	expect(resolve).toHaveBeenCalledWith(mockEvent);
});

test('handle (auth part) redirects unauthenticated users from /dashboard', async () => {
	const mockEvent = createMockEvent(undefined, null, null, '/dashboard'); // No session token
	const resolve = vi.fn(() => Promise.resolve(new Response()));

	await expect(handle({ event: mockEvent as any, resolve })).rejects.toEqual(redirect(302, '/login'));
	expect(redirect).toHaveBeenCalledWith(302, '/login');
});

test('handle (logout part) invalidates session and redirects on /logout', async () => {
	const mockSession = { id: 'session1', userId: 'user1', expiresAt: new Date() };
	vi.mocked(auth.validateSessionToken).mockResolvedValue({ session: mockSession, user: { id: 'user1', username: 'testuser' } });
	vi.mocked(auth.invalidateSession).mockResolvedValue(undefined);

	const mockEvent = createMockEvent('valid-token', { id: 'user1', username: 'testuser' }, mockSession, '/logout');
	const resolve = vi.fn(() => Promise.resolve(new Response()));

	await expect(handle({ event: mockEvent as any, resolve })).rejects.toEqual(redirect(302, '/login'));
	expect(auth.invalidateSession).toHaveBeenCalledWith(mockSession.id);
	expect(auth.deleteSessionTokenCookie).toHaveBeenCalledWith(mockEvent);
	expect(redirect).toHaveBeenCalledWith(302, '/login');
});

test('handle (logout part) does nothing if not /logout route', async () => {
	const mockUser = { id: 'user1', username: 'testuser' };
	const mockSession = { id: 'session1', userId: 'user1', expiresAt: new Date() };
	vi.mocked(auth.validateSessionToken).mockResolvedValue({ session: mockSession, user: mockUser });

	const mockEvent = createMockEvent('valid-token', mockUser, mockSession, '/some-other-route');
	const resolve = vi.fn(() => Promise.resolve(new Response()));
	await handle({ event: mockEvent as any, resolve });

	expect(auth.invalidateSession).not.toHaveBeenCalled();
	expect(auth.deleteSessionTokenCookie).not.toHaveBeenCalled();
	expect(redirect).not.toHaveBeenCalled();
	expect(resolve).toHaveBeenCalledWith(mockEvent);
});