export async function load() {
    const cartMap = new Map<number, string>();
    window.BSS_B2B.shopData.cart.items.forEach((item) => {
        const productId = item.product_id;
        if (!!productId && !cartMap.get(productId)) {
            cartMap.set(productId, item.key);
        }
    });

    window.BSS_B2B.cart = cartMap;
}
