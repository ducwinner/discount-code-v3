export function getCart() {
    return fetch(`/cart.js`, {
        method: `GET`,
        headers: {
            'Content-Type': `application/json`,
        },
    });
}

export function updateCart(update: any) {
    return fetch(`/cart/update.js`, {
        method: `POST`,
        headers: {
            Accept: `application/json`,
            'Content-Type': `application/json`,
        },
        body: JSON.stringify(update),
    });
}

export function search(query: string) {
    const url = encodeURI(`/search.js?q=${query}&view=bss.b2b`);
    return fetch(url);
}
