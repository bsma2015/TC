kendo.ui.Window.prototype.options.modal = true;
kendo.ui.Window.prototype.options.animation = false;
Parse.initialize("ZlfjhGKdRaAChnvP9x9oYYmzVMEtPYP1wGKys004", "8bzswRRhjQARgyexkb6K3Wvc8Vxu1ZXM0BOnqkaZ");
var currentUser;
$(document).ready(function () {
    Settings.router = new kendo.Router();
    Settings.router.route("/", function () {
        Settings.router.navigate("#main");
    });
    var view;
    var container;
    container = $("#content");
    currentUser = Parse.User.current();
    Settings.router.route("afterLogin", function () {
    });
    Settings.router.route(":Act", function (act, params) {
        console.log("page", act);
        if (act != "login" && !currentUser) {
            Settings.router.navigate("#login");
        }
        else {
            var queryString = "?";
            $.each(params, function (index, element) {
                queryString += index + "=" + element + "&";
            });
            queryString = queryString.substring(0, queryString.length - 1);
            if (view) {
                view.destroy();
            }
            view = new kendo.View(act + "PageTemplate");
            view.render(container);
            if (PagesInit[act])
                PagesInit[act]();
        }
    });
    Settings.router.start();
});
window.onload = function () {
    $["material"].init();
    usersInit();
};
//# sourceMappingURL=app.js.map