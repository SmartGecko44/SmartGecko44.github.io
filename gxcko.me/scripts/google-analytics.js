window.googleOnLoad = function () {
    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }

    gtag('js', new Date());

    gtag('config', 'G-MJD6FZJPCB');

    console.log("Google Analytics loaded.");
}