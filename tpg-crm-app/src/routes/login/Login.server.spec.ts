// tpg-crm-app/src/routes/login/Login.server.spec.ts
import { expect, test, vi, beforeEach } from 'vitest';
import { actions, load } from './+page.server';
import { redirect, fail } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { hash, verify } from '@node-rs/argon2';

// Mock external dependencies
vi.mock('$lib/server/auth');
vi.mock('$lib/server/db');
vi.mock('$lib/server/db/schema');
vi.mock('@node-rs/argon2');
vi.mock('@sveltejs/kit', async (importOriginal) => {
	const actual = (await importOriginal()) as Record<string, any>;
	return {
		...actual,
		redirect: vi.fn(),
		fail: vi.fn()
	};
});

beforeEach(() => {
	vi.clearAllMocks();
});

// Helper to create a mock event
const createMockEvent = (formData: FormData, localsUser: any = null) => ({
	request: {
		formData: vi.fn(() => Promise.resolve(formData))
	},
	locals: {
		user: localsUser
	},
	cookies: {
		set: vi.fn(),
		delete: vi.fn()
	}
});

test('load function redirects to dashboard if user is logged in', async () => {
	const mockEvent = createMockEvent(new FormData(), { id: 'user1', username: 'testuser' });
	await load(mockEvent as any);
	expect(redirect).toHaveBeenCalledWith(302, '/dashboard');
});

test('load function returns empty object if user is not logged in', async () => {
	const mockEvent = createMockEvent(new FormData(), null);
	const result = await load(mockEvent as any);
	expect(result).toEqual({});
	expect(redirect).not.toHaveBeenCalled();
});

test('login action fails with invalid username', async () => {
	const formData = new FormData();
	formData.append('username', 'ab'); // Too short
	formData.append('password', 'password123');
	formData.append('actionType', 'login');

	const mockEvent = createMockEvent(formData);
	await actions.default(mockEvent as any);
	expect(fail).toHaveBeenCalledWith(400, { message: 'Invalid username (min 3, max 31 characters, alphanumeric only)' });
});

test('login action fails with invalid password', async () => {
	const formData = new FormData();
	formData.append('username', 'testuser');
	formData.append('password', 'short'); // Too short
	formData.append('actionType', 'login');

	const mockEvent = createMockEvent(formData);
	await actions.default(mockEvent as any);
	expect(fail).toHaveBeenCalledWith(400, { message: 'Invalid password (min 6, max 255 characters)' });
});

test('login action fails if user does not exist', async () => {
	const formData = new FormData();
	formData.append('username', 'nonexistent');
	formData.append('password', 'password123');
	formData.append('actionType', 'login');

	vi.mocked(db.select).mockReturnValue({
		from: vi.fn(() => ({
			where: vi.fn(() => Promise.resolve([]))
		}))
	} as any);

	const mockEvent = createMockEvent(formData);
	await actions.default(mockEvent as any);
	expect(fail).toHaveBeenCalledWith(400, { message: 'Incorrect username or password' });
});

test('login action fails with incorrect password', async () => {
	const formData = new FormData();
	formData.append('username', 'testuser');
	formData.append('password', 'wrongpassword');
	formData.append('actionType', 'login');

	vi.mocked(db.select).mockReturnValue({
		from: vi.fn(() => ({
			where: vi.fn(() => Promise.resolve([{ id: 'user1', username: 'testuser', passwordHash: 'hashedpassword' }]))
		}))
	} as any);
	vi.mocked(verify).mockResolvedValue(false);

	const mockEvent = createMockEvent(formData);
	await actions.default(mockEvent as any);
	expect(fail).toHaveBeenCalledWith(400, { message: 'Incorrect username or password' });
});

test('login action successfully logs in user', async () => {
	const formData = new FormData();
	formData.append('username', 'testuser');
	formData.append('password', 'correctpassword');
	formData.append('actionType', 'login');

	const mockUser = { id: 'user1', username: 'testuser', passwordHash: 'hashedpassword' };
	vi.mocked(db.select).mockReturnValue({
		from: vi.fn(() => ({
			where: vi.fn(() => Promise.resolve([mockUser]))
		}))
	} as any);
	vi.mocked(verify).mockResolvedValue(true);
	vi.mocked(auth.generateSessionToken).mockReturnValue('sessiontoken123');
	vi.mocked(auth.createSession).mockResolvedValue({ id: 'session1', userId: 'user1', expiresAt: new Date() });

	const mockEvent = createMockEvent(formData);
	await actions.default(mockEvent as any);
	expect(auth.setSessionTokenCookie).toHaveBeenCalledWith(mockEvent, 'sessiontoken123', expect.any(Date));
	expect(redirect).toHaveBeenCalledWith(302, '/dashboard');
});

test('register action successfully registers user', async () => {
	const formData = new FormData();
	formData.append('username', 'newuser');
	formData.append('password', 'newpassword123');
	formData.append('actionType', 'register');

	vi.mocked(hash).mockResolvedValue('newhashedpassword');
	vi.mocked(db.insert).mockReturnValue({
		values: vi.fn(() => Promise.resolve())
	} as any);
	vi.mocked(auth.generateSessionToken).mockReturnValue('newsessiontoken');
	vi.mocked(auth.createSession).mockResolvedValue({ id: 'newsession', userId: 'newuser1', expiresAt: new Date() });

	const mockEvent = createMockEvent(formData);
	await actions.default(mockEvent as any);
	expect(db.insert).toHaveBeenCalledWith(table.user);
	expect(auth.setSessionTokenCookie).toHaveBeenCalledWith(mockEvent, 'newsessiontoken', expect.any(Date));
	expect(redirect).toHaveBeenCalledWith(302, '/dashboard');
});

test('register action fails on database error', async () => {
	const formData = new FormData();
	formData.append('username', 'newuser');
	formData.append('password', 'newpassword123');
	formData.append('actionType', 'register');

	vi.mocked(hash).mockResolvedValue('newhashedpassword');
	vi.mocked(db.insert).mockReturnValue({
		values: vi.fn(() => Promise.reject(new Error('DB error')))
	} as any);

	const mockEvent = createMockEvent(formData);
	await actions.default(mockEvent as any);
	expect(fail).toHaveBeenCalledWith(500, { message: 'An error has occurred' });
});