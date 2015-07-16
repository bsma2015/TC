var PagesInit;
(function (PagesInit) {
    "use strict";
    function main() {
        HeaderListInit();
    }
    PagesInit.main = main;
    function login() {
        loginInit();
    }
    PagesInit.login = login;
})(PagesInit || (PagesInit = {}));
