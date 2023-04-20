import * as Modules from '@/modules';
import * as Runner from '@/runner';

import writeLog from './log';
import { formatMoney } from './currency';
import * as cart from './cart';
import * as country from './country';
import * as page from './page';

export async function load() {
    window.BSS_B2B.products = new Map();
    window.BSS_B2B.countryTax = null;
    window.BSS_B2B.log = writeLog;
    window.BSS_B2B.formatMoney = formatMoney;
    await Modules.load();
    country.getStoredInfo();
    await country.fetchInfo();
    await cart.load();
    await page.load();
    return Runner.run();
}
