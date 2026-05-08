import { test, expect } from '@playwright/test';

test.describe('Edit Event Form', () => {
  test.beforeEach(async ({ page }) => {
    // Change this route to your actual edit page
    await page.goto('/edit-event/1');
  });

  test('renders form with existing event values', async ({ page }) => {
    await expect(page.getByLabel('Name'))
      .toHaveValue('Basketball Tournament');

    await expect(page.getByLabel('Location'))
      .toHaveValue('UH Gym');

    await expect(page.getByLabel('Owner'))
      .toHaveValue(/UH Athletics/i);

    await expect(page.getByLabel('Description'))
      .toHaveValue(/basketball/i);
  });

  test('updates event successfully', async ({ page }) => {
    await page.getByLabel('Name')
      .fill('Updated Basketball Tournament');

    await page.getByLabel('Location')
      .fill('Updated Gym');

    await page.getByLabel('Description')
      .fill('Updated event description.');

    await page.getByRole('button', { name: 'Update Event' })
      .click();

    await expect(page.getByText('Success!'))
      .toBeVisible();

    await expect(page.getByText('Event updated successfully!'))
      .toBeVisible();
  });

  test('redirects after successful update', async ({ page }) => {
    await page.getByLabel('Name')
      .fill('Redirect Test Event');

    await page.getByRole('button', { name: 'Update Event' })
      .click();

    await expect(page.getByText('Success!'))
      .toBeVisible();

    // Wait for redirect
    await page.waitForURL('**/events');

    await expect(page).toHaveURL(/events/);
  });

  test('shows validation errors for invalid inputs', async ({ page }) => {
    await page.getByLabel('Name').fill('');

    await page.getByRole('button', { name: 'Update Event' })
      .click();

    // Adjust based on your Yup schema
    await expect(page.getByText(/name/i))
      .toBeVisible();
  });

  test('updates interests multiselect', async ({ page }) => {
    const multiselects = page.locator('.multiselect-container');

    // Interests dropdown
    await multiselects.first().click();

    await page.getByText('Sports').click();

    await page.getByText('Technology').click();

    await page.getByRole('button', { name: 'Update Event' })
      .click();

    await expect(page.getByText('Success!'))
      .toBeVisible();
  });

  test('updates participants multiselect', async ({ page }) => {
    const multiselects = page.locator('.multiselect-container');

    // Participants dropdown
    await multiselects.nth(1).click();

    await page.getByText('test@example.com').click();

    await page.getByText('admin@example.com').click();

    await page.getByRole('button', { name: 'Update Event' })
      .click();

    await expect(page.getByText('Success!'))
      .toBeVisible();
  });

  test('shows error popup when update fails', async ({ page }) => {
    // Mock failed request
    await page.route('**/api/events/**', async route => {
      await route.fulfill({
        status: 500,
        body: JSON.stringify({
          error: 'Update failed',
        }),
      });
    });

    await page.getByLabel('Name')
      .fill('Failure Update');

    await page.getByRole('button', { name: 'Update Event' })
      .click();

    await expect(page.getByText('Error!'))
      .toBeVisible();

    await expect(page.getByText('Failed to update event!'))
      .toBeVisible();
  });
});
