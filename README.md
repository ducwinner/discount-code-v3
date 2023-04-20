# BSS - B2B/Wholesale Solution - Storefront Script

## Compatible `upload content`

### Build content for `bss-b2b-header.liquid`

```javascript
const moduleCodes = [
    "bogo",
    "cp",
    "dc",
    "ef",
    "mc",
    "ol",
    "qb",
    "qi",
    "rf",
    "sr",
    "td",
    "te"
];
function buildModuleConfig({ code, status }) {
    let content = ``;
    if (moduleCodes.indexOf(code) !== -1) {
        const assignment = `window.BSS_B2B.modules.${code}`;
        if (status === 1) {
            if (code === `cp`) {
                // bss-b2b-cp-header.liquid bên dưới
                content = `
                    ${content}
                    {% capture cp_header %}{% include 'bss-b2b-cp-header' %}{% end capture %}
                    {% unless cp_header contains "Liquid error" %}{{ cp_header }}{% endunless %}
                `;
            } else if (code === `qb`) {
                // bss-b2b-qb-header.liquid bên dưới
                content = `
                    ${content}
                    {% capture qb_header %}{% include 'bss-b2b-qb-header' %}{% end capture %}
                    {% unless qb_header contains "Liquid error" %}{{ qb_header }}{% endunless %}
                `;
            } else {
                /**
                 Khác với CP và QB đã tách upload content sang các services,
                 các module chưa được tách sẽ tiếp tục được gán vào assignment
                 --------------------------------------
                 CHÚ Ý: chỉnh sửa tên biến cho gọn gàng
                 --------------------------------------
                 */
                content = `
                    ${assignment} = ${assignment} || {
                        code: "${code}",
                        status: "${status === 1}",
                    };
                    ${assignment}.field = value;
                `
            }
        }
    }
    return content; 
}

const content = `
    <!--any style tags-->
    <!--start script-->
    ${fileBssState}
    <script id="bss-b2b-config-data">
        // only 1 declaration
        window.BSS_B2B = window.BSS_B2B || {};
        window.BSS_B2B.storeId = ${parseInt(shopId)};
        window.BSS_B2B.planCode = "${planCode}";
        window.BSS_B2B.version = ${appVersion ?? 1};
        window.BSS_B2B.modules = window.BSS_B2B.modules || {};
        // { code: string, status: 0 | 1 }[]
        ${smsArray.forEach(sms => {
            buildModuleConfig(sms);
        })}
        // global variables
        window.bssB2bApiServer = "${SERVER_URL}";
        window.bssB2bCmsUrl = "${CMS_URL}";
        window.bssGeoServiceUrl = "${GEO_SERVICE_URL}";
        window.bssB2BIsRequiredVat = ${defaultVatSettings ? defaultVatSettings.is_required_vat : null};
        window.bssB2BAutoExemptTax = ${defaultVatSettings ? defaultVatSettings.auto_exempt_tax : null};
        window.bssB2BAutoRedirectToCheckout = ${defaultVatSettings ? defaultVatSettings.auto_redirect_to_checkout : null};
        window.bssB2BEnableSelectEUVATCountries = ${defaultVatSettings ? defaultVatSettings.enable_select_eu_vat_countries : null};
        window.bssB2BSelectedEUVATCountries = "${selectedEuVatCountries}";
        window.bssB2BEnableEuVat = ${defaultVatSettings ? defaultVatSettings.enable_eu_vat : null};
        window.bssB2BEnableUkVat = ${defaultVatSettings ? defaultVatSettings.enable_uk_vat : null};
        window.bssB2BEnableGst = ${defaultVatSettings ? defaultVatSettings.enable_gst : null};
        window.bssB2BEnableAbn = ${defaultVatSettings ? defaultVatSettings.enable_abn : null};
        window.bssB2BVatExemptSelectedOriginal = ${defaultVatSettings ? bssVatExemptSelected : null};
        window.bssB2BVatExemptSelected = ${defaultVatSettings ? bssVatExemptSelected : null};
    </script>
`;
```

### Build content for `bss-b2b-cp-header.liquid`

```javascript
const assignment = `window.BSS_B2B.modules.cp`;
const content = `
// Nối tiếp nội dung trong file header tổng
${assignment} = ${assignment} || {
    code: cp,
    status: 1
};
${assignment}.configData = ${cpConfig ? cpConfig.ruleConfigData : null};
${assignment}.plConfigData = ${cpConfig ? cpConfig.plRuleConfigData : null};
${assignment}.cpSettings = ${cpConfig ? JSON.stringify(cpConfig.cpSettings) : null};
${assignment}.customPricingSettings = ${customPricingSettings ? JSON.stringify(customPricingSettings) : null};
`;

```

### Build content for `bss-b2b-qb-header.liquid`

```javascript
const assignment = `window.BSS_B2B.modules.qb`;
const content = `
// Nối tiếp nội dung trong file header tổng
${assignment} = ${assignment} || {
    code: qb,
    status: 1
};
BSS_B2B.qbRules = ${qbConfig ? qbConfig.qbRulesData : null};
BSS_B2B.qbTranslations = ${qbConfig ? JSON.stringify(qbConfig.qbTexts) : null};
BSS_B2B.qbSettings = ${qbConfig ? JSON.stringify(qbConfig.qbSettings) : null};
`;
```

### Build content header cho các module khác

Nên viết lại hàm build content dựa trên và kế thừa từ CP và QB ở trên
