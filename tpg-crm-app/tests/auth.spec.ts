// tpg-crm-app/tests/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Login and Registration Flow', () => {
	test('should allow a user to register and then log in', async ({ page }) => {
		await page.goto('/login');

		// Register a new user
		await page.fill('input[name="username"]', 'e2e_test_user');
		await page.fill('input[name="password"]', 'e2e_password123');
		await page.click('button:has-text("Register")');

		// Expect to be redirected to the dashboard
		await expect(page).toHaveURL('/dashboard');
		await expect(page.getByRole('heading', { name: /Welcome, e2e_test_user!/i })).toBeVisible();

		// Logout
		await page.click('button:has-text("Logout")');
		await expect(page).toHaveURL('/login');

		// Log in with the registered user
		await page.fill('input[name="username"]', 'e2e_test_user');
		await page.fill('input[name="password"]', 'e2e_password123');
		await page.click('button:has-text("Login")');

		// Expect to be redirected to the dashboard again
		await expect(page).toHaveURL('/dashboard');
		await expect(page.getByRole('heading', { name: /Welcome, e2e_test_user!/i })).toBeVisible();
	});

	test('should show an error for invalid login credentials', async ({ page }) => {
		await page.goto('/login');

		await page.fill('input[name="username"]', 'nonexistent_user');
		await page.fill('input[name="password"]', 'wrong_password');
		await page.click('button:has-text("Login")');

		// Expect to stay on the login page and see an error message
		await expect(page).toHaveURL('/login');
		await expect(page.getByText(/Incorrect username or password/i)).toBeVisible();
	});

	test('should redirect unauthenticated users from dashboard to login', async ({ page }) => {
		await page.goto('/dashboard');
		await expect(page).toHaveURL('/login');
		await expect(page.getByRole('heading', { name: /Login or Register/i })).toBeVisible();
	});

	test('should redirect unauthenticated users from home page to login if trying to access dashboard', async ({ page }) => {
		await page.goto('/');
		// Ensure not logged in
		await expect(page.getByRole('link', { name: /Login \/ Register/i })).toBeVisible();

		// Try to go to dashboard directly
		await page.goto('/dashboard');
		await expect(page).toHaveURL('/login');
	});

	test('should show dashboard link on home page when authenticated', async ({ page }) => {
		await page.goto('/login');

		// Register a new user
		await page.fill('input[name="username"]', 'home_test_user');
		await page.fill('input[name="password"]', 'home_password123');
		await page.click('button:has-text("Register")');

		await expect(page).toHaveURL('/dashboard'); // Ensure logged in

		await page.goto('/'); // Go to home page
		await expect(page.getByRole('heading', { name: /Welcome back, home_test_user!/i })).toBeVisible();
		await expect(page.getByRole('link', { name: /Go to Dashboard/i })).toBeVisible();
	});

	test('should allow user to logout from dashboard', async ({ page }) => {
		await page.goto('/login');

		// Register and login
		await page.fill('input[name="username"]', 'logout_test_user');
		await page.fill('input[name="password"]', 'logout_password123');
		await page.click('button:has-text("Register")');
		await expect(page).toHaveURL('/dashboard');

		// Logout
		await page.click('button:has-text("Logout")');
		await expect(page).toHaveURL('/login');

		// Verify session is cleared
		await page.goto('/dashboard');
		await expect(page).toHaveURL('/login');
	});
});