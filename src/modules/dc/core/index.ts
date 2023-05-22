import Hookable from '@/Hookable';
import { DcUtils } from '@/types';
import { AjaxCartApi, searchProducts, toLowerCase } from '@/utils';

export class DcCore extends Hookable implements DcUtils {
    getAppliedCodes(): Promise<any> {
        AjaxCartApi.getCart()
            .then((response) => response.json())
            .then((cartData) => {
                const cartAttributes = cartData.attributes;
                if (cartAttributes.discountCodeRule && cartAttributes.discountCodeRule.length > 0) {
                    const discountCode = JSON.parse(cartAttributes.discountCodeRule).discount_code;
                    const today = new Date();
                    const moment = today.toLocaleTimeString();
                    const handles = [];
                    for (let i = 0; i < window.BSS_B2B.shopData.cart.items.length; i++) {
                        const item = window.BSS_B2B.shopData.cart.items[i];
                        const proId = item.product_id;
                        if (handles.indexOf(proId) === -1) {
                            handles.push(proId);
                        }
                    }
                    searchProducts(handles)
                        .then((response) => response.json())
                        .then((data) => {
                            const responseProducts = data;
                            if (responseProducts.length > 0) {
                                for (let i = 0; i < window.BSS_B2B.shopData.cart.items.length; i++) {
                                    const item = window.BSS_B2B.shopData.cart.items[i];
                                    for (let j = 0; j < responseProducts.length; j++) {
                                        if (item.product_id == responseProducts[j].id) {
                                            responseProducts[j].key = item.key;
                                            responseProducts[j].quantity = item.quantity;
                                        }
                                    }
                                }

                                const checkData = {
                                    today: today,
                                    moment: moment,
                                    customer: window.BSS_B2B.shopData.customer,
                                    cart_items: responseProducts,
                                    domain: window.BSS_B2B.shopData.shop.permanent_domain,
                                    discount_code: discountCode,
                                    isEnableCP: window.BSS_B2B.modules.cp.status,
                                    isEnableQB: window.BSS_B2B.qb.status,
                                    qbRules: window.BSS_B2B.qb.rules,
                                    // cpRules: window.BSS_B2B.modules.cp.rules,
                                };

                                fetch(window.bssB2bApiServer + `/dc/check-discount-code`, {
                                    method: `POST`,
                                    headers: {
                                        'Content-Type': `application/json`,
                                    },
                                    body: JSON.stringify(checkData),
                                })
                                    .then((response) => response.json())
                                    .then((data) => {
                                        if (data.success) {
                                            if (window.BSS_B2B.storeId === 3793) {
                                                // BSS_B2B.customize.dc.checkLimitAmountInit(data, cartAttributes, shopData);
                                                return;
                                            }
                                            document
                                                .querySelectorAll(`#bss-b2b-discount-code-input`)
                                                .forEach((item) => {
                                                    item.setAttribute(`discount-code`, `true`);
                                                });
                                            document
                                                .querySelectorAll(`#bss-b2b-discount-code-applied-wrapper`)
                                                .forEach((item) => {
                                                    item.innerHTML =
                                                        `<div id="bss-b2b-discount-code-applied">` +
                                                        `<span>` +
                                                        discountCode +
                                                        `</span>` +
                                                        `<div id="bss-b2b-clear-discount-code">X</div>` +
                                                        `</div>`;
                                                });
                                            const listKeysItemAppliedDC = data.listKeysItemAppliedDC;
                                            data.listProductIdsAppliedDC.forEach(function (productId) {
                                                window.BSS_B2B.shopData.cart.items.forEach(function (item) {
                                                    if (item.product_id == productId) {
                                                        if (listKeysItemAppliedDC.indexOf(item.key) === -1) {
                                                            listKeysItemAppliedDC.push(item.key);
                                                        }
                                                    }
                                                });
                                            });

                                            AjaxCartApi.updateCart({
                                                attributes: {
                                                    discountCodeRule: JSON.stringify({
                                                        dc_keys: listKeysItemAppliedDC,
                                                        discount_value: data.discountValue,
                                                        discount_type: data.discountType,
                                                        discount_code: data.discountCode,
                                                    }),
                                                },
                                            }).then(() => {
                                                window.BSS_B2B.modules.dc.logic.handleRemoveCode();
                                            });
                                        }
                                    })
                                    .catch((error) => {
                                        window.BSS_B2B.log(error);
                                    });
                            }
                        });
                }
            });
        return;
    }
    handleRemoveCode(): Promise<any> {
        const clearDiscountCodeBtn = document.getElementById(`bss-b2b-clear-discount-code`);
        clearDiscountCodeBtn.addEventListener(`click`, (event) => {
            event.preventDefault();

            const messageDiscountCodes = document.querySelectorAll(`#bss-b2b-discount-code-message`);
            const discountCodeInputs = document.querySelectorAll(`#bss-b2b-discount-code-input`);
            const discountCodesApplied = document.querySelectorAll(`#bss-b2b-discount-code-applied-wrapper`);

            if (messageDiscountCodes.length && discountCodeInputs.length && discountCodesApplied.length) {
                for (let j = 0; j < messageDiscountCodes.length; j++) {
                    const messageDiscountCode = messageDiscountCodes[j];
                    const discountCodeInput = discountCodeInputs[j];
                    const discountCodeApplied = discountCodesApplied[j];
                    (discountCodeInput as HTMLInputElement).value = ``;
                    discountCodeInput.removeAttribute(`discount-code`);
                    discountCodeApplied.innerHTML = ``;
                    messageDiscountCode.innerHTML = ``;
                }
            }
            AjaxCartApi.updateCart({
                attributes: {
                    discountCodeRule: JSON.stringify({}),
                },
            });
        });
        return;
    }
    showBox(): Promise<any> {
        const dcRules = window.BSS_B2B.modules.dc.rules;
        let isShowDiscountBox = true;
        const customerId = window.BSS_B2B.shopData.customer.id;
        const customerTags =
            window.BSS_B2B.shopData.customer && window.BSS_B2B.shopData.customer.tags
                ? window.BSS_B2B.shopData.customer.tags.map(toLowerCase)
                : [];

        if (dcRules) {
            if (dcRules.length === 0) {
                isShowDiscountBox = false;
            } else if (dcRules.length > 0) {
                for (const rule of dcRules) {
                    const applyTo = rule.apply_to;
                    if (applyTo === 0) {
                        isShowDiscountBox = true;
                    } else if (applyTo === 1) {
                        if (customerId == null) {
                            isShowDiscountBox = false;
                        } else {
                            isShowDiscountBox = true;
                        }
                    } else if (applyTo === 2) {
                        if (customerId != null) {
                            isShowDiscountBox = false;
                        } else {
                            isShowDiscountBox = true;
                        }
                    } else if (applyTo === 3) {
                        const customerIdsRule = rule.customer_ids.split(`,`);

                        if (customerIdsRule.includes(customerId + ``)) {
                            isShowDiscountBox = true;
                        } else {
                            isShowDiscountBox = false;
                        }
                    } else if (applyTo === 4) {
                        const customerTagsRule: string[] = rule.customer_tags.split(`,`);
                        const checkArray = customerTagsRule.filter((tag) => customerTags.includes(tag.toLowerCase()));
                        if (checkArray.length === 0) {
                            isShowDiscountBox = false;
                        } else {
                            isShowDiscountBox = true;
                        }
                    }

                    if (isShowDiscountBox === true) {
                        break;
                    }
                }
            }
        }

        if (isShowDiscountBox) {
            document.querySelectorAll(`.bss-b2b-discount-code-wrapper`).forEach((item) => {
                (item as HTMLElement).style.display = `inline-grid`;
            });
        } else {
            document.querySelectorAll(`.bss-b2b-discount-code-wrapper`).forEach((item) => {
                item.remove();
            });
        }
        return;
    }
}
