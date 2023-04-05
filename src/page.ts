import { IPage } from "./types/interfaces";

const Page: IPage = {
    get getPage(): string[] {
        return window.location.href.split(`/`);
    },
    get isCartPage(): boolean {
        const hrefArr = window.BSS_B2B.page.getPage;
        return (
            hrefArr[hrefArr.length - 1] === `cart` ||
            (hrefArr[hrefArr.length - 1].includes(`cart`) &&
                hrefArr[hrefArr.length - 2] !== `products` &&
                hrefArr[hrefArr.length - 2] !== `collections`)
        );
    },
    get isCollectionPage(): boolean {
        if (
            window.ShopifyAnalytics &&
            window.ShopifyAnalytics.meta &&
            window.ShopifyAnalytics.meta.page &&
            (window.BSS_B2B.storeId === 7355 || window.ShopifyAnalytics.meta.page.pageType)
        ) {
            return window.ShopifyAnalytics.meta.page.pageType === `collection`;
        } else {
            const hrefArr = window.BSS_B2B.page.getPage;
            return hrefArr[hrefArr.length - 2] === `collections`;
        }
    },
    get isCustomPage(): boolean {
        if (
            window.ShopifyAnalytics &&
            window.ShopifyAnalytics.meta &&
            window.ShopifyAnalytics.meta.page &&
            window.ShopifyAnalytics.meta.page.pageType
        ) {
            return window.ShopifyAnalytics.meta.page.pageType === `page`;
        } else {
            const hrefArr = window.BSS_B2B.page.getPage;
            return hrefArr[hrefArr.length - 2] === `pages`;
        }
    },
    get isLoginPage(): boolean {
        const hrefArr = window.BSS_B2B.page.getPage;
        return (
            (hrefArr[hrefArr.length - 1] === `login` || hrefArr[hrefArr.length - 1].includes(`login`)) &&
            hrefArr[hrefArr.length - 2] === `account`
        );
    },
    get isHomePage(): boolean {
        if (
            window.ShopifyAnalytics &&
            window.ShopifyAnalytics.meta &&
            window.ShopifyAnalytics.meta.page &&
            window.ShopifyAnalytics.meta.page.pageType
        ) {
            return window.ShopifyAnalytics.meta.page.pageType === `home`;
        } else {
            const hrefArr = window.BSS_B2B.page.getPage;
            return hrefArr[hrefArr.length - 1] === ``;
        }
    },
    get isProductPage(): boolean {
        if (
            window.ShopifyAnalytics &&
            window.ShopifyAnalytics.meta &&
            window.ShopifyAnalytics.meta.page &&
            (window.BSS_B2B.storeId === 7355 || window.ShopifyAnalytics.meta.page.pageType)
        ) {
            return window.ShopifyAnalytics.meta.page.pageType === `product`;
        } else {
            const hrefArr = window.BSS_B2B.page.getPage;
            return hrefArr[hrefArr.length - 2] === `products`;
        }
    },
    get isQuickOrderPage(): boolean {
        const hrefArr = window.BSS_B2B.page.getPage;
        return hrefArr[hrefArr.length - 1] === `quick-order` && hrefArr[hrefArr.length - 2] !== `customer-portal`;
    },
    get isRegisterPage(): boolean {
        const hrefArr = window.BSS_B2B.page.getPage;
        return (
            (hrefArr[hrefArr.length - 1] === `register` || hrefArr[hrefArr.length - 1].includes(`register`)) &&
            hrefArr[hrefArr.length - 2] === `account`
        );
    },
    get isSearchPage(): boolean {
        if (
            window.ShopifyAnalytics &&
            window.ShopifyAnalytics.meta &&
            window.ShopifyAnalytics.meta.page &&
            window.ShopifyAnalytics.meta.page.pageType
        ) {
            return window.ShopifyAnalytics.meta.page.pageType === `searchresults`;
        } else {
            const hrefArr = window.BSS_B2B.page.getPage;
            return hrefArr[hrefArr.length - 1] === `search` || hrefArr[hrefArr.length - 1].includes(`search`);
        }
    },
};

export default Page;
