import { test, expect } from '@playwright/test';
import { login } from './helpers/login';

test.describe('Change Password Page', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/change-password');
  });

  test('renders change password form', async ({ page }) => {
    await expect(
      page.getByRole('heading', {
        name: 'Change Password',
      }),
    ).toBeVisible();

    await expect(
      page.getByLabel('Old Passord'),
    ).toBeVisible();

    await expect(
      page.getByLabel('New Password'),
    ).toBeVisible();

    await expect(
      page.getByLabel('Confirm Password'),
    ).toBeVisible();

    await expect(
      page.getByRole('button', {
        name: 'Change',
      }),
    ).toBeVisible();

    await expect(
      page.getByRole('button', {
        name: 'Reset',
      }),
    ).toBeVisible();
  });

  test('shows validation errors for empty form', async ({ page }) => {
    await page.getByRole('button', {
      name: 'Change',
    }).click();

    await expect(
      page.getByText('Password is required').first(),
    ).toBeVisible();

    await expect(
      page.getByText('Confirm Password is required'),
    ).toBeVisible();
  });

  test('shows password mismatch validation', async ({ page }) => {
    await page.getByLabel('Old Passord')
      .fill('oldpassword123');

    await page.getByLabel('New Password')
      .fill('newpassword123');

    await page.getByLabel('Confirm Password')
      .fill('wrongpassword');

    await page.getByRole('button', {
      name: 'Change',
    }).click();

    await expect(
      page.getByText('Confirm Password does not match'),
    ).toBeVisible();
  });

  test('shows minimum password length validation', async ({ page }) => {
    await page.getByLabel('Old Passord')
      .fill('oldpassword123');

    await page.getByLabel('New Password')
      .fill('123');

    await page.getByLabel('Confirm Password')
      .fill('123');

    await page.getByRole('button', {
      name: 'Change',
    }).click();

    await expect(
      page.getByText('Password must be at least 6 characters'),
    ).toBeVisible();
  });

  test('resets form fields', async ({ page }) => {
    await page.getByLabel('Old Passord')
      .fill('oldpassword123');

    await page.getByLabel('New Password')
      .fill('newpassword123');

    await page.getByLabel('Confirm Password')
      .fill('newpassword123');

    await page.getByRole('button', {
      name: 'Reset',
    }).click();

    await expect(
      page.getByLabel('Old Passord'),
    ).toHaveValue('');

    await expect(
      page.getByLabel('New Password'),
    ).toHaveValue('');

    await expect(
      page.getByLabel('Confirm Password'),
    ).toHaveValue('');
  });

  test('successfully changes password', async ({ page }) => {
    await page.getByLabel('Old Passord')
      .fill('password123');

    await page.getByLabel('New Password')
      .fill('newpassword123');

    await page.getByLabel('Confirm Password')
      .fill('newpassword123');

    await page.getByRole('button', {
      name: 'Change',
    }).click();

    await expect(
      page.getByText('Password Changed'),
    ).toBeVisible();

    await expect(
      page.getByText('Your password has been changed'),
    ).toBeVisible();
  });

  test('shows loading spinner while session loads', async ({ page }) => {
    // Optional depending on implementation
    await page.goto('/change-password');

    await expect(
      page.locator('[data-testid="loading-spinner"]'),
    ).toBeVisible();
  });
});
