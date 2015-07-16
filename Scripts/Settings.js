var Settings;
(function (Settings) {
    "use strict";
    Settings.validRequired = { required: { message: "აუცილებელი ველი!" } };
    function dateTimeToddMMyyyy(date) {
        if (date) {
            date = date.split("T");
            date = date[0];
            date = date.split("-");
            return date[2] + "/" + date[1] + "/" + date[0];
        }
        else {
            return null;
        }
    }
    Settings.dateTimeToddMMyyyy = dateTimeToddMMyyyy;
    Settings.router;
})(Settings || (Settings = {}));
//# sourceMappingURL=Settings.js.map