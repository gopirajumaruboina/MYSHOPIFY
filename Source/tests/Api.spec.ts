import { expect, test } from '@playwright/test'

test('api', async ({ request }) => {
    const res = await request.get('.')
    await expect(res).toBeOK()
})