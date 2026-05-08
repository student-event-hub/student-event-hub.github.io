import { test, expect } from '@playwright/test';
import { login } from './helpers/login';

test.describe('Home Page', () => {
  test('redirects unauthenticated users', async ({ page }) => {
    await page.goto('/home');

    // Adjust based on your auth redirect
    await expect(page).toHaveURL(/login|signin/);
  });

  test('renders homepage for logged in user', async ({ page }) => {
    // Replace with your actual login helper
    await page.goto('/auth/signin');

    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('password123');

    await page.getByRole('button', { name: /sign in/i }).click();

    await page.goto('/home');

    await expect(page).toHaveURL(/home/);
  });

  test('displays profile information', async ({ page }) => {
    await login(page);

    await page.goto('/home');

    // Change selectors to match your UI
    await expect(page.getByText(/john doe/i))
      .toBeVisible();

    await expect(page.getByText(/computer science/i))
      .toBeVisible();
  });

  test('displays interests', async ({ page }) => {
    await login(page);

    await page.goto('/home');

    await expect(page.getByText('Basketball'))
      .toBeVisible();

    await expect(page.getByText('Programming'))
      .toBeVisible();
  });

  test('displays projects', async ({ page }) => {
    await login(page);

    await page.goto('/home');

    await expect(page.getByText('AI Project'))
      .toBeVisible();

    await expect(page.getByText('Web App'))
      .toBeVisible();
  });

  test('handles missing profile gracefully', async ({ page }) => {
    await login(page);

    // Mock failed profile response if applicable
    await page.route('**/api/profile/**', async route => {
      await route.fulfill({
        status: 404,
        body: JSON.stringify({
          error: 'Profile not found',
        }),
      });
    });

    await page.goto('/home');

    // Adjust based on your actual UI
    await expect(page.getByText(/profile not found/i))
      .toBeVisible();
  });
});
