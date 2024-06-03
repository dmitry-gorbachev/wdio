import { expect, browser, $ } from '@wdio/globals';
import { constants } from '../../constants.js';
import { randomText } from '../../utils.js';

describe('Working with iFrame', () => {
    it('User is able to edit text in the text field', async () => {
        await browser.url(constants.mainPageUrl);

        await $('//a[@href="/frames"]').click();
        await $('//a[@href="/iframe"]').click();

        const getDocumentText = () => browser.executeScript('return document.documentElement.outerText',[]);
        expect(await getDocumentText()).toContain('An iFrame containing the TinyMCE WYSIWYG Editor');
        await $('.tox-notification__dismiss').click();

        const iFrame = await browser.findElement('css selector', '#mce_0_ifr',)
        await browser.switchToFrame(iFrame);
        const iFrameArea = $('#tinymce')
        const iFrameInputField = await $('#tinymce p');

        //let's workaround the non-editable text field with replacing the node's attribute
        await browser.execute( () => document.getElementById('tinymce').setAttribute("contenteditable", "true"));
        //now wait for the updated element to be available
        await $('//body[@id="tinymce" and @contenteditable="true"]').waitForDisplayed();

        const randomString = randomText(20);
        const initialInputFieldValue = await iFrameArea.getText();
        const expectedString = `${randomString}${initialInputFieldValue}`;
        await iFrameInputField.addValue(randomString);
        await expect(await iFrameArea.getText()).toEqual(expectedString);

        await browser.switchToFrame(null);

        //again, workaround the disabled menu: make the menu button available 
        await browser.execute( () => document.querySelector('.tox-menubar button:nth-of-type(2)').removeAttribute('disabled'));
        //now, when the buttons of the main menu are enabled, open the menu Edit
        await $('//*[contains(text(),"Edit")]/parent::button').click();
        //same thing: the availability of the menu items needs to be restored
        await browser.execute( () => document.querySelector('div[title="Undo"]').classList.remove("tox-collection__item--state-disabled"));

        await $('div[title="Undo"]').click();
        await browser.switchToFrame(iFrame);
        await expect(await iFrameArea.getText()).toEqual(initialInputFieldValue);
    })
})