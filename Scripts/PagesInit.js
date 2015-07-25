var PagesInit;
(function (PagesInit) {
    "use strict";
    function main() {
        mainInit();
    }
    PagesInit.main = main;
    function login() {
        loginInit();
    }
    PagesInit.login = login;
    function courses() {
        coursesListInit();
    }
    PagesInit.courses = courses;
    function headers() {
        HeaderListInit();
    }
    PagesInit.headers = headers;
})(PagesInit || (PagesInit = {}));
