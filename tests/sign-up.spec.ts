import { test, expect } from '@playwright/test';

test.describe('Sign Up Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/signup');
  });

  test('renders signup form', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Sign Up' }),
    ).toBeVisible();

    await expect(page.getByLabel('Email'))
      .toBeVisible();

    await expect(page.getByLabel('Password'))
      .toBeVisible();

    await expect(page.getByLabel('Confirm Password'))
      .toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Register' }),
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Reset' }),
    ).toBeVisible();
  });

  test('shows validation errors for empty form', async ({ page }) => {
    await page.getByRole('button', {
      name: 'Register',
    }).click();

    await expect(
      page.getByText('Email is required'),
    ).toBeVisible();

    await expect(
      page.getByText('Password is required'),
    ).toBeVisible();

    await expect(
      page.getByText('Confirm Password is required'),
    ).toBeVisible();
  });

  test('shows invalid email validation', async ({ page }) => {
    await page.getByLabel('Email')
      .fill('invalid-email');

    await page.getByRole('button', {
      name: 'Register',
    }).click();

    await expect(
      page.getByText('Email is invalid'),
    ).toBeVisible();
  });

  test('shows password length validation', async ({ page }) => {
    await page.getByLabel('Email')
      .fill('test@example.com');

    await page.getByLabel('Password')
      .fill('123');

    await page.getByLabel('Confirm Password')
      .fill('123');

    await page.getByRole('button', {
      name: 'Register',
    }).click();

    await expect(
      page.getByText('Password must be at least 6 characters'),
    ).toBeVisible();
  });

  test('shows password mismatch validation', async ({ page }) => {
    await page.getByLabel('Email')
      .fill('test@example.com');

    await page.getByLabel('Password')
      .fill('password123');

    await page.getByLabel('Confirm Password')
      .fill('wrongpassword');

    await page.getByRole('button', {
      name: 'Register',
    }).click();

    await expect(
      page.getByText('Confirm Password does not match'),
    ).toBeVisible();
  });

  test('resets form fields', async ({ page }) => {
    await page.getByLabel('Email')
      .fill('test@example.com');

    await page.getByLabel('Password')
      .fill('password123');

    await page.getByLabel('Confirm Password')
      .fill('password123');

    await page.getByRole('button', {
      name: 'Reset',
    }).click();

    await expect(
      page.getByLabel('Email'),
    ).toHaveValue('');

    await expect(
      page.getByLabel('Password'),
    ).toHaveValue('');

    await expect(
      page.getByLabel('Confirm Password'),
    ).toHaveValue('');
  });

  test('successfully registers new user', async ({ page }) => {
    const uniqueEmail = `user${Date.now()}@example.com`;

    await page.getByLabel('Email')
      .fill(uniqueEmail);

    await page.getByLabel('Password')
      .fill('password123');

    await page.getByLabel('Confirm Password')
      .fill('password123');

    await page.getByRole('button', {
      name: 'Register',
    }).click();

    // Redirect after signIn
    await page.waitForURL('**/add');

    await expect(page).toHaveURL(/add/);
  });

  test('shows existing account link', async ({ page }) => {
    const signInLink = page.getByRole('link', {
      name: 'Sign in',
    });

    await expect(signInLink)
      .toBeVisible();

    await signInLink.click();

    await expect(page).toHaveURL(/signin/);
  });
});
