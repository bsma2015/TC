function install() {
    var currentUser;
    var roleACL = new Parse.ACL();
    roleACL.setPublicReadAccess(true);
    roleACL.setPublicWriteAccess(true);
    roleACL.setRoleWriteAccess("Administrators", true);
    var role = new Parse.Role("Administrators", roleACL);
    role.save();
    var user = new Parse.User();
    user.set("username", "Administrator");
    user.set("password", "123456");
    user.set("email", "email@example.com");
    user.signUp(null, {}).then(function () {
        Parse.User.logIn("Administrator", "123456", {}).then(function () {
            currentUser = Parse.User.current();
            var users = role.getUsers();
            users.add(currentUser);
            role.save();
            var Header = Parse.Object.extend("Header");
            var header = new Header();
            header.save();
        });
    });
    var role2 = new Parse.Role("Registereds", roleACL);
    role2.save();
}
function destroy() {
    var Obj = Parse.Object.extend("_Role");
    var query = new Parse.Query(Obj);
    query.find({
        success: function (results) {
            for (var i = 0; i < results.length; i++) {
                var obj = results[i];
                obj.destroy();
            }
        }
    });
    Obj = Parse.Object.extend("_User");
    query = new Parse.Query(Obj);
    query.find({
        success: function (results) {
            for (var i = 0; i < results.length; i++) {
                var obj = results[i];
                obj.destroy();
            }
        }
    });
    Obj = Parse.Object.extend("Header");
    query = new Parse.Query(Obj);
    query.find({
        success: function (results) {
            for (var i = 0; i < results.length; i++) {
                var obj = results[i];
                obj.destroy();
            }
        }
    });
    Obj = Parse.Object.extend("Course");
    query = new Parse.Query(Obj);
    query.find({
        success: function (results) {
            for (var i = 0; i < results.length; i++) {
                var obj = results[i];
                obj.destroy();
            }
        }
    });
}
var interfaces;
(function (interfaces) {
    "use strict";
    ;
})(interfaces || (interfaces = {}));
var resources;
(function (resources) {
    "use strict";
    resources.departments = [
        { name: "Navigation Department", value: "navigation", img: "http://college.novikontas.lv/static/img/menu/courses-navigation.png" },
        { name: "Engineering Department", value: "engineering", img: "http://college.novikontas.lv/static/img/menu/courses-engineering.png" },
        { name: "Catering Department", value: "catering", img: "http://college.novikontas.lv/static/img/menu/courses-catering.png" }
    ];
    resources.professions = [
        { department: "navigation", name: "Captain", value: "captain" },
        { department: "navigation", name: "Chief officer", value: "chief officer" },
        { department: "navigation", name: "2nd, 3rd officer", value: "2nd, 3rd officer" },
        { department: "navigation", name: "Bosun", value: "bosun" },
        { department: "navigation", name: "Ab-able seaman", value: "ab-able seaman" },
        { department: "navigation", name: "Os-ordinary seaman", value: "os-ordinary seaman" },
        { department: "engineering", name: "Chief Engineer", value: "chief engineer" },
        { department: "engineering", name: "3rd, 4th engineer", value: "3rd, 4th egineer" },
        { department: "engineering", name: "Electrical engineer", value: "Electrical engineer" },
        { department: "engineering", name: "Wiper", value: "wiper" },
        { department: "engineering", name: "Fitter", value: "fitter" },
        { department: "engineering", name: "Motorman", value: "motorman" },
        { department: "engineering", name: "Pumpman", value: "pumpman" },
        { department: "catering", name: "Cook", value: "cook" },
        { department: "catering", name: "Steward/stewardess", value: "steward/stewardess" },
    ];
})(resources || (resources = {}));
//# sourceMappingURL=Install.js.map