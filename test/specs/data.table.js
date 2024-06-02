import { expect, browser, $ } from '@wdio/globals';
import { constants } from '../../constants.js';

let currencySign = '$';
let expected = 251.0;


describe('List of elements in a table Example 1', () => {
    it('should have sum of dues equal to 251.0', async () => {
        await browser.url(constants.mainPageUrl);

        await $('//a[contains(text(),\'Sortable Data Tables\')]').click();
        await expect(await $('//h3[contains(text(),\'Data Tables\')]')).toBeExisting();

        let dueValues = await $$('//table[@id="table1"]//td[4]');
        let actual = 0;

        for (let item of dueValues) {
            let text = await item.getText();
            actual += +(text.replace(currencySign,''));
        }

        expect(actual).toEqual(expected);
    })
})