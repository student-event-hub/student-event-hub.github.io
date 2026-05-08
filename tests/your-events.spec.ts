import { test, expect } from '@playwright/test';
import { login, loginAsEmptyUser } from './helpers/login';

test.describe('Your Events Page', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('redirects unauthenticated users', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('/your-events');

    // Adjust based on your auth flow
    await expect(page).toHaveURL(/signin|login/);
  });

  test('renders your events page', async ({ page }) => {
    await page.goto('/your-events');

    await expect(page.locator('#your-events-page'))
      .toBeVisible();
  });

  test('shows joined or created events', async ({ page }) => {
    await page.goto('/your-events');

    await expect(
      page.getByText('Basketball Tournament'),
    ).toBeVisible();

    await expect(
      page.getByText('Hackathon'),
    ).toBeVisible();
  });

  test('does not show expired events', async ({ page }) => {
    await page.goto('/your-events');

    await expect(
      page.getByText('Old Expired Event'),
    ).not.toBeVisible();
  });

  test('shows participant information', async ({ page }) => {
    await page.goto('/your-events');

    await expect(
      page.getByText('john@example.com'),
    ).toBeVisible();
  });

  test('shows event interests', async ({ page }) => {
    await page.goto('/your-events');

    await expect(
      page.getByText('Programming'),
    ).toBeVisible();

    await expect(
      page.getByText('Sports'),
    ).toBeVisible();
  });

  test('shows user vote state', async ({ page }) => {
    await page.goto('/your-events');

    const likedButton = page.locator(
      '[data-testid="like-button-1"]',
    );

    await expect(likedButton)
      .toHaveAttribute('data-active', 'true');
  });

  test('user can remove joined event', async ({ page }) => {
    await page.goto('/your-events');

    const removeButton = page.locator(
      '[data-testid="leave-button-1"]',
    );

    await removeButton.click();

    await expect(
      page.getByText('Basketball Tournament'),
    ).not.toBeVisible();
  });

  test('shows empty state when no events exist', async ({ page }) => {
    // Use test DB fixture/user with no events
    await loginAsEmptyUser(page);

    await page.goto('/your-events');

    await expect(
      page.getByText(/no events/i),
    ).toBeVisible();
  });

  test('handles failed remove event gracefully', async ({ page }) => {
    await page.route('**/api/events/**', async route => {
      await route.fulfill({
        status: 500,
        body: JSON.stringify({
          error: 'Failed',
        }),
      });
    });

    await page.goto('/your-events');

    const removeButton = page.locator(
      '[data-testid="leave-button-1"]',
    );

    await removeButton.click();

    // Event should still remain visible
    await expect(
      page.getByText('Basketball Tournament'),
    ).toBeVisible();
  });
});
