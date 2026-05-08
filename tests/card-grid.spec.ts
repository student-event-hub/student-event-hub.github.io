import { test, expect } from '@playwright/test';
import { login } from './helpers/login';

test.describe('CardGrid', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/events');
  });

  test('renders event cards', async ({ page }) => {
    await expect(page.getByText('Basketball Tournament'))
      .toBeVisible();

    await expect(page.getByText('Hackathon'))
      .toBeVisible();
  });

  test('authenticated user can like an event', async ({ page }) => {
    await login(page);

    await page.goto('/events');

    const likeButton = page
      .locator('[data-testid="like-button-1"]');

    await likeButton.click();

    // Example count update
    await expect(page.getByText('1 Like'))
      .toBeVisible();
  });

  test('authenticated user can dislike an event', async ({ page }) => {
    await login(page);

    await page.goto('/events');

    const dislikeButton = page
      .locator('[data-testid="dislike-button-1"]');

    await dislikeButton.click();

    await expect(page.getByText('1 Dislike'))
      .toBeVisible();
  });

  test('clicking same vote removes vote', async ({ page }) => {
    await login(page);

    await page.goto('/events');

    const likeButton = page
      .locator('[data-testid="like-button-1"]');

    await likeButton.click();

    await likeButton.click();

    await expect(page.getByText('0 Likes'))
      .toBeVisible();
  });

  test('unauthenticated users cannot vote', async ({ page }) => {
    await page.goto('/events');

    const likeButton = page
      .locator('[data-testid="like-button-1"]');

    await expect(likeButton)
      .toBeDisabled();
  });

  test('user can join an event', async ({ page }) => {
    await login(page);

    await page.goto('/events');

    const joinButton = page
      .locator('[data-testid="join-button-1"]');

    await joinButton.click();

    await expect(
      page.getByText(/joined/i),
    ).toBeVisible();
  });

  test('user can leave an event', async ({ page }) => {
    await login(page);

    await page.goto('/my-events');

    const leaveButton = page
      .locator('[data-testid="leave-button-1"]');

    await leaveButton.click();

    await expect(
      page.getByText(/removed/i),
    ).toBeVisible();
  });

  test('removed event disappears from grid', async ({ page }) => {
    await login(page);

    await page.goto('/my-events');

    const leaveButton = page
      .locator('[data-testid="leave-button-1"]');

    await leaveButton.click();

    await expect(
      page.getByText('Basketball Tournament'),
    ).not.toBeVisible();
  });

  test('disables buttons while updating', async ({ page }) => {
    await login(page);

    await page.goto('/events');

    const likeButton = page
      .locator('[data-testid="like-button-1"]');

    await likeButton.click();

    await expect(likeButton)
      .toBeDisabled();
  });

  test('handles failed like update gracefully', async ({ page }) => {
    await login(page);

    await page.route('**/api/events/**', async route => {
      await route.fulfill({
        status: 500,
        body: JSON.stringify({
          error: 'Server error',
        }),
      });
    });

    await page.goto('/events');

    const likeButton = page
      .locator('[data-testid="like-button-1"]');

    await likeButton.click();

    // Verify UI rollback
    await expect(page.getByText('0 Likes'))
      .toBeVisible();
  });
});
