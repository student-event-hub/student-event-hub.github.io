/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Page } from '@playwright/test';

export async function login(page: Page) {
  await page.goto('/auth/signin');

  await page.getByLabel('Email')
    .fill('test@example.com');

  await page.getByLabel('Password')
    .fill('password123');

  await page.getByRole('button', {
    name: /sign in/i,
  }).click();
}

export async function loginAsEmptyUser(page: Page) {
  await page.goto('/auth/signin');

  await page.getByLabel('Email')
    .fill('empty@example.com');

  await page.getByLabel('Password')
    .fill('password123');

  await page.getByRole('button', {
    name: /sign in/i,
  }).click();
}
