import { test, expect } from '@playwright/test';

test.describe('Create Event Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/create-event');
  });

  test('renders all form fields', async ({ page }) => {
    await expect(page.getByLabel('Name')).toBeVisible();
    await expect(page.getByLabel('Location')).toBeVisible();
    await expect(page.getByLabel('Date')).toBeVisible();
    await expect(page.getByLabel('Start Time')).toBeVisible();
    await expect(page.getByLabel('End Time')).toBeVisible();
    await expect(page.getByLabel('Owner')).toBeVisible();
    await expect(page.getByLabel('Picture URL')).toBeVisible();
    await expect(page.getByLabel('Description')).toBeVisible();
    await expect(page.getByText('Interests')).toBeVisible();
    await expect(page.getByText('Participants')).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Create Event' }),
    ).toBeVisible();
  });

  test('shows validation errors on empty submit', async ({ page }) => {
    await page.getByRole('button', { name: 'Create Event' }).click();

    // Adjust these messages to match your Yup schema exactly
    await expect(page.getByText(/name/i)).toBeVisible();
    await expect(page.getByText(/location/i)).toBeVisible();
    await expect(page.getByText(/date/i)).toBeVisible();
  });

  test('fills out and submits the form successfully', async ({ page }) => {
    await page.getByLabel('Name').fill('Basketball Tournament');

    await page.getByLabel('Location').fill('UH Gym');

    await page.getByLabel('Date').fill('2026-05-20');

    await page.getByLabel('Start Time').fill('10:00');

    await page.getByLabel('End Time').fill('14:00');

    await page.getByLabel('Owner').fill('UH Athletics');

    await page
      .getByLabel('Picture URL')
      .fill('https://example.com/image.jpg');

    await page
      .getByLabel('Description')
      .fill('A fun basketball event.');

    // Interests multiselect
    const interestDropdown = page.locator('.multiselect-container');
    await interestDropdown.first().click();

    await page.getByText('Sports').click();

    // Participants multiselect
    await interestDropdown.nth(1).click();

    await page.getByText('test@example.com').click();

    await page.getByRole('button', { name: 'Create Event' }).click();

    // SweetAlert success popup
    await expect(page.getByText('Success!')).toBeVisible();
    await expect(
      page.getByText('Event created successfully!'),
    ).toBeVisible();
  });

  test('resets form after successful submit', async ({ page }) => {
    await page.getByLabel('Name').fill('Test Event');

    await page.getByLabel('Location').fill('Campus');

    await page.getByLabel('Date').fill('2026-05-20');

    await page.getByLabel('Start Time').fill('09:00');

    await page.getByLabel('End Time').fill('11:00');

    await page.getByLabel('Owner').fill('Admin');

    await page.getByRole('button', { name: 'Create Event' }).click();

    await expect(page.getByText('Success!')).toBeVisible();

    // Verify reset
    await expect(page.getByLabel('Name')).toHaveValue('');
    await expect(page.getByLabel('Location')).toHaveValue('');
  });

  test('shows error popup when submission fails', async ({ page }) => {
    // Optional:
    // Intercept API request and force failure

    await page.route('**/api/events/**', async route => {
      await route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Server error' }),
      });
    });

    await page.getByLabel('Name').fill('Failure Event');

    await page.getByLabel('Location').fill('Nowhere');

    await page.getByLabel('Date').fill('2026-05-20');

    await page.getByLabel('Start Time').fill('10:00');

    await page.getByLabel('End Time').fill('12:00');

    await page.getByLabel('Owner').fill('Tester');

    await page.getByRole('button', { name: 'Create Event' }).click();

    await expect(page.getByText('Error!')).toBeVisible();

    await expect(
      page.getByText('Failed to create event!'),
    ).toBeVisible();
  });
});
