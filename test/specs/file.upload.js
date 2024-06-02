import { expect, browser, $ } from '@wdio/globals';
import { constants } from '../../constants.js';
import path from 'path';

const fileName = "lipsum.txt";
const fileFieldSelector = '//input[@id="file-upload"]';
const uploadButtonSelector = '//input[@id="file-submit"]';
const uploadedFilesSelector = '//div[@id="uploaded-files"]';

describe('File uploading test', () => {
    it('File can be uploaded to the page', async () => {
        await browser.url(constants.mainPageUrl);

        await $('//a[@href="/upload"]').click();
        const selectFileField = await $(fileFieldSelector);
        await selectFileField.setValue(path.resolve(`testData/${fileName}`));
        await $(uploadButtonSelector).click();

        await expect(await $(uploadedFilesSelector).getText()).toEqual(fileName);
    })
})