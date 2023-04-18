import { Page } from '@/interfaces/global';

const page: Page = Object.freeze({
    getPage(): string[] {
        return window.location.href.split(`/`);
    },
    isCartPage(): boolean {
        const hrefArr = this.getPage();
        return (
            hrefArr[hrefArr.length - 1] === `cart` ||
            (hrefArr[hrefArr.length - 1].includes(`cart`) &&
                hrefArr[hrefArr.length - 2] !== `products` &&
                hrefArr[hrefArr.length - 2] !== `collections`)
        );
    },
    isCollectionPage(): boolean {
        if (
            window.ShopifyAnalytics &&
            window.ShopifyAnalytics.meta &&
            window.ShopifyAnalytics.meta.page &&
            (window.BSS_B2B.storeId === 7355 || window.ShopifyAnalytics.meta.page.pageType)
        ) {
            return window.ShopifyAnalytics.meta.page.pageType === `collection`;
        } else {
            const hrefArr = this.getPage();
            return hrefArr[hrefArr.length - 2] === `collections`;
        }
    },
    isCustomPage(): boolean {
        if (
            window.ShopifyAnalytics &&
            window.ShopifyAnalytics.meta &&
            window.ShopifyAnalytics.meta.page &&
            window.ShopifyAnalytics.meta.page.pageType
        ) {
            return window.ShopifyAnalytics.meta.page.pageType === `page`;
        } else {
            const hrefArr = this.getPage();
            return hrefArr[hrefArr.length - 2] === `pages`;
        }
    },
    isLoginPage(): boolean {
        const hrefArr = this.getPage();
        return (
            (hrefArr[hrefArr.length - 1] === `login` || hrefArr[hrefArr.length - 1].includes(`login`)) &&
            hrefArr[hrefArr.length - 2] === `account`
        );
    },
    isHomePage(): boolean {
        if (
            window.ShopifyAnalytics &&
            window.ShopifyAnalytics.meta &&
            window.ShopifyAnalytics.meta.page &&
            window.ShopifyAnalytics.meta.page.pageType
        ) {
            return window.ShopifyAnalytics.meta.page.pageType === `home`;
        } else {
            const hrefArr = this.getPage();
            return hrefArr[hrefArr.length - 1] === ``;
        }
    },
    isProductPage(): boolean {
        if (
            window.ShopifyAnalytics &&
            window.ShopifyAnalytics.meta &&
            window.ShopifyAnalytics.meta.page &&
            (window.BSS_B2B.storeId === 7355 || window.ShopifyAnalytics.meta.page.pageType)
        ) {
            return window.ShopifyAnalytics.meta.page.pageType === `product`;
        } else {
            const hrefArr = this.getPage();
            return hrefArr[hrefArr.length - 2] === `products`;
        }
    },
    isQuickOrderPage(): boolean {
        const hrefArr = this.getPage();
        return hrefArr[hrefArr.length - 1] === `quick-order` && hrefArr[hrefArr.length - 2] !== `customer-portal`;
    },
    isRegisterPage(): boolean {
        const hrefArr = this.getPage();
        return (
            (hrefArr[hrefArr.length - 1] === `register` || hrefArr[hrefArr.length - 1].includes(`register`)) &&
            hrefArr[hrefArr.length - 2] === `account`
        );
    },
    isSearchPage(): boolean {
        if (
            window.ShopifyAnalytics &&
            window.ShopifyAnalytics.meta &&
            window.ShopifyAnalytics.meta.page &&
            window.ShopifyAnalytics.meta.page.pageType
        ) {
            return window.ShopifyAnalytics.meta.page.pageType === `searchresults`;
        } else {
            const hrefArr = this.getPage();
            return hrefArr[hrefArr.length - 1] === `search` || hrefArr[hrefArr.length - 1].includes(`search`);
        }
    },
});

export default page;
