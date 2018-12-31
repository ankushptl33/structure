/* ========================================================

    1) @babel/polyfill
    2) Fetch

   ====================================================== */
require('@babel/polyfill');

if (typeof window.fetch === 'undefined') {
    require('whatwg-fetch');
}
