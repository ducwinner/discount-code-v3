export function avoidDetect(element: Element): boolean {
    const isLoginPattern = element.querySelector(`.bsscommerce-ltsp-message`);
    const isSkipAvoiding = window.BSS_B2B.storeId === 2984 && !window.__st.cid;

    return !!isLoginPattern && !isSkipAvoiding;
}
