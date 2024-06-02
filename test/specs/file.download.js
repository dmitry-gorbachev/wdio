import { expect, browser, $ } from '@wdio/globals';
import { constants } from '../../constants.js';
import fs from 'fs';

const downloadsPath = global.downloadDir;
const fileName = "some-file.txt";
const txtFileLinkSelector = `//a[contains(text(),"${fileName}")]`;

describe('File downloading test', () => {
    before('Clear the downloads content', async () => {
        if (await fs.existsSync(downloadsPath)) {
            await fs.rmSync(downloadsPath,{ recursive: true });
        }
        await fs.mkdirSync(downloadsPath,{ recursive: true });
    })
    it('File can be downloaded by a link', async () => {
        await browser.url(constants.mainPageUrl);

        await $('//a[@href="/download"]').click();
        const fileLink = await $(txtFileLinkSelector);
        expect(fileLink).toBeExisting();
        await fileLink.click();
        const filePath = `${downloadsPath}/${fileName}`;
        await browser.waitUntil(async () => fs.existsSync(filePath), {timeout: 5000});
        await expect(await fs.existsSync(filePath)).toEqual(true);
    })
})