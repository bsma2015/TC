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
    function courses() {
        coursesListInit();
    }
    PagesInit.courses = courses;
})(PagesInit || (PagesInit = {}));
