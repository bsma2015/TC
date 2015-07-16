function loginInit() {
    $("#loginSubmit").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        Parse.User.logIn($("#login").val(), $("#password").val(), {
            success: function (user) {
                currentUser = Parse.User.current();
                Settings.router.navigate("#afterLogin");
                Settings.router.navigate("#");
            },
            error: function (user, error) {
            }
        });
    });
}
//# sourceMappingURL=Login.js.map