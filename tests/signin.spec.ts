import { test, expect } from '@playwright/test';

test.describe('Sign In Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/signin');
  });

  test('renders sign in form', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Sign In' }),
    ).toBeVisible();

    await expect(
      page.getByLabel('Email'),
    ).toBeVisible();

    await expect(
      page.getByLabel('Password'),
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Sign In' }),
    ).toBeVisible();
  });

  test('successfully signs in user', async ({ page }) => {
    await page.getByLabel('Email')
      .fill('test@example.com');

    await page.getByLabel('Password')
      .fill('password123');

    await page.getByRole('button', {
      name: 'Sign In',
    }).click();

    await page.waitForURL('**/your-events');

    await expect(page)
      .toHaveURL(/your-events/);
  });

  test('shows error for invalid credentials', async ({ page }) => {
    await page.getByLabel('Email')
      .fill('wrong@example.com');

    await page.getByLabel('Password')
      .fill('wrongpassword');

    await page.getByRole('button', {
      name: 'Sign In',
    }).click();

    await expect(
      page.getByText('Invalid email or password.'),
    ).toBeVisible();
  });

  test('redirects to callback url after sign in', async ({ page }) => {
    await page.goto('/auth/signin?callbackUrl=/events');

    await page.getByLabel('Email')
      .fill('test@example.com');

    await page.getByLabel('Password')
      .fill('password123');

    await page.getByRole('button', {
      name: 'Sign In',
    }).click();

    await page.waitForURL('**/events');

    await expect(page)
      .toHaveURL(/events/);
  });

  test('shows url error message', async ({ page }) => {
    await page.goto('/auth/signin?error=CredentialsSignin');

    await expect(
      page.getByText('Invalid email or password.'),
    ).toBeVisible();
  });

  test('navigates to sign up page', async ({ page }) => {
    const signUpLink = page.getByRole('link', {
      name: /sign up/i,
    });

    await expect(signUpLink)
      .toBeVisible();

    await signUpLink.click();

    await expect(page)
      .toHaveURL(/signup/);
  });

  test('prevents empty form submission', async ({ page }) => {
    await page.getByRole('button', {
      name: 'Sign In',
    }).click();

    // Browser HTML validation
    await expect(
      page.getByLabel('Email'),
    ).toBeFocused();
  });
});
