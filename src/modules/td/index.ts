function init() {
    if (!window.BSS_B2B.td.status) {
        return;
    }
    const td = window.BSS_B2B.td;
    if (td.taxOverrides) {
        td.taxOverridesByCountryCode = td.taxOverrides.filter(
            (item) => item.country_code === window.BSS_B2B.countryCode
        );
        td.taxOverridesRestOfWorld = td.taxOverrides.filter((item) => item.country_code === '*');
    }
}

export { init };
