import { PercentageFactor, PriceFactor, mutiplyMarketRate } from '@/utils/common';

export default async function getModifiedPrice(price: number, type: 0 | 1 | 2, value: number) {
    let modifiedPrice = price;
    const marketRate = parseFloat(window.Shopify.currency.rate);
    if (type === 0) {
        const priceOriginCurrency = price / marketRate;
        const priceDiscount = value * PriceFactor;
        if (priceOriginCurrency > priceDiscount) {
            let actualDiscount = (priceOriginCurrency - priceDiscount) / PriceFactor;
            actualDiscount = parseFloat(actualDiscount.toFixed(2));
            actualDiscount = actualDiscount * marketRate;
            actualDiscount = parseFloat(actualDiscount.toFixed(2));
            actualDiscount = actualDiscount * PriceFactor;

            modifiedPrice = Math.round((price - actualDiscount) * PriceFactor) / PriceFactor;
        }
    } else if (type === 1) {
        const priceDiscountMarket = mutiplyMarketRate(value);
        modifiedPrice = priceDiscountMarket > price ? 0 : price - priceDiscountMarket;
    } else if (type === 2) {
        let actualDiscount = (price / marketRate) * (value / PercentageFactor);
        actualDiscount = parseFloat(actualDiscount.toFixed(0));
        actualDiscount = parseFloat((actualDiscount * marketRate).toFixed(0));

        modifiedPrice = price - actualDiscount;
    }

    return modifiedPrice;
}
