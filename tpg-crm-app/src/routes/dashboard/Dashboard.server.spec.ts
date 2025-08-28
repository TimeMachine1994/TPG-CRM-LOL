// tpg-crm-app/src/routes/dashboard/Dashboard.server.spec.ts
import { expect, test, vi, beforeEach } from 'vitest';
import { load } from './+page.server';
import { redirect } from '@sveltejs/kit';

// Mock external dependencies
vi.mock('@sveltejs/kit', () => {
	return {
		redirect: vi.fn()
	};
});

beforeEach(() => {
	vi.clearAllMocks();
});

// Helper to create a mock event
const createMockEvent = (localsUser: any = null) => ({
	locals: {
		user: localsUser
	}
});

test('load function redirects to login if user is not authenticated', async () => {
	const mockEvent = createMockEvent(null);
	await load(mockEvent as any);
	expect(redirect).toHaveBeenCalledWith(302, '/login');
});

test('load function returns user data if authenticated', async () => {
	const mockUser = { id: 'user1', username: 'testuser' };
	const mockEvent = createMockEvent(mockUser);
	const result = await load(mockEvent as any);
	expect(result).toEqual({ user: mockUser });
	expect(redirect).not.toHaveBeenCalled();
});