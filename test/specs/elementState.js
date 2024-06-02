import { expect, browser, $ } from '@wdio/globals';
import { constants } from '../../constants.js';
import { randomText } from '../../utils.js';

const inputFieldSelector = '//form[@id="input-example"]/input';
const randomStringlength = 30;

describe('Input field on the page', () => {
    it('can be enabled', async () => {
        await browser.url(constants.mainPageUrl);

        await $('//a[contains(text(),"Dynamic Controls")]').click();
        await expect(await $('//h4[contains(text(),"Dynamic Controls")]')).toBeExisting();
        const inputField = await $(inputFieldSelector);
        await expect(!(await inputField.isEnabled()));

        await $('//form[@id="input-example"]/button[contains(text(),"Enable")]').click();
        await inputField.waitForEnabled({
            timeout: 4000,
            interval: 500,
        });
        await expect(await inputField.isEnabled()).toEqual(true);

        const randomString = randomText(randomStringlength);
        await $(inputField).addValue(randomString);
        const actual = await inputField.getValue();
        await expect(actual).toEqual(randomString);
    })
})