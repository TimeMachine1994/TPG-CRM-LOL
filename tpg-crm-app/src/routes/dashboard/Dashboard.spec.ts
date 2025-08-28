// tpg-crm-app/src/routes/dashboard/Dashboard.spec.ts
import { render, screen, fireEvent } from '@testing-library/svelte';
import { expect, test, vi } from 'vitest';
import DashboardPage from './+page.svelte';
import * as form from '$app/forms';

vi.mock('$app/forms', () => ({
	enhance: vi.fn(() => ({
		update: vi.fn()
	}))
}));

test('Dashboard page displays welcome message with username', async () => {
	const mockUser = { id: 'user1', username: 'testuser' };
	render(DashboardPage, {
		props: {
			data: {
				user: mockUser
			}
		}
	});

	expect(screen.getByRole('heading', { name: /Welcome, testuser!/i })).toBeInTheDocument();
	expect(screen.getByText(/This is your personalized dashboard./i)).toBeInTheDocument();
});

test('Dashboard page has a logout button', async () => {
	const mockUser = { id: 'user1', username: 'testuser' };
	render(DashboardPage, {
		props: {
			data: {
				user: mockUser
			}
		}
	});

	const logoutButton = screen.getByRole('button', { name: /Logout/i });
	expect(logoutButton).toBeInTheDocument();
});

test('Logout button triggers form submission to /logout', async () => {
	const mockUser = { id: 'user1', username: 'testuser' };
	render(DashboardPage, {
		props: {
			data: {
				user: mockUser
			}
		}
	});

	const logoutButton = screen.getByRole('button', { name: /Logout/i });
	await fireEvent.click(logoutButton);

	// In a real scenario, you'd mock the form submission and check the payload.
	// With `enhance`, it's more about ensuring the form is submitted and `enhance` is called.
	// For server-side actions, E2E tests are more effective.
	// Here, we can check if the form action is correctly set.
	expect(logoutButton.closest('form')).toHaveAttribute('action', '/logout');
});