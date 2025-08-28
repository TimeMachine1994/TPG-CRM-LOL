/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom/vitest" />

// tpg-crm-app/src/routes/login/Login.spec.ts
import { render, screen, fireEvent } from '@testing-library/svelte';
import { expect, test, vi } from 'vitest';
import LoginPage from './+page.svelte';
import * as form from '$app/forms';

vi.mock('$app/forms', () => ({
	enhance: vi.fn(() => ({
		update: vi.fn()
	}))
}));

test('Login page renders correctly', async () => {
	render(LoginPage, {
		props: {
			form: null
		}
	});

	expect(screen.getByRole('heading', { name: /Login or Register/i })).toBeInTheDocument();
	expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
	expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
	expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
	expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
});

test('Login form submission includes actionType', async () => {
	render(LoginPage, {
		props: {
			form: null
		}
	});

	const usernameInput = screen.getByLabelText(/Username/i);
	const passwordInput = screen.getByLabelText(/Password/i);
	const loginButton = screen.getByRole('button', { name: /Login/i });

	await fireEvent.input(usernameInput, { target: { value: 'testuser' } });
	await fireEvent.input(passwordInput, { target: { value: 'password123' } });
	await fireEvent.click(loginButton);

	const loginActionType = screen.getByDisplayValue('login');
	expect(loginActionType).toBeInTheDocument();
	expect(loginActionType).toHaveAttribute('name', 'actionType');
});

test('Register form submission includes actionType', async () => {
	render(LoginPage, {
		props: {
			form: null
		}
	});

	const usernameInput = screen.getByLabelText(/Username/i);
	const passwordInput = screen.getByLabelText(/Password/i);
	const registerButton = screen.getByRole('button', { name: /Register/i });

	await fireEvent.input(usernameInput, { target: { value: 'newuser' } });
	await fireEvent.input(passwordInput, { target: { value: 'newpassword123' } });
	await fireEvent.click(registerButton);

	const registerActionType = screen.getByDisplayValue('register');
	expect(registerActionType).toBeInTheDocument();
	expect(registerActionType).toHaveAttribute('name', 'actionType');
});

test('Displays error message from form prop', async () => {
	const errorMessage = 'Invalid credentials provided.';
	render(LoginPage, {
		props: {
			form: { message: errorMessage }
		}
	});

	expect(screen.getByText(errorMessage)).toBeInTheDocument();
});