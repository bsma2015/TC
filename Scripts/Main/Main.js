function mainInit() {
    var obj = { courses: [] };
    var tabstrip = $("#mainTabtStrip").kendoTabStrip({
        select: function (e) {
            console.log(arguments);
            var tabId = e.contentElement.getAttribute("id");
            var el = $(e.contentElement);
            switch (tabId) {
                case "mainTabtStrip-1":
                    el.find("#departments").kendoListView({
                        dataSource: {
                            data: resources.departments,
                        },
                        dataBound: function (listEvent) {
                            el.find("button").click(function (event) {
                                obj.department = event.target["value"];
                                e.sender.enable(e.sender.tabGroup.children().eq(1), true);
                                e.sender.select(1);
                            });
                        },
                        template: kendo.template($("#departmentsListTemplate").html())
                    });
                    break;
                case "mainTabtStrip-2":
                    el.html($("#professionsTabTemplate").html());
                    el.find("#professions").kendoListView({
                        dataSource: {
                            data: resources.professions,
                            filter: { field: "department", operator: "eq", value: obj.department }
                        },
                        dataBound: function (listEvent) {
                            el.find("button").click(function (event) {
                                console.log(event.target["value"]);
                                obj.profession = event.target["value"];
                                e.sender.enable(e.sender.tabGroup.children().eq(2), true);
                                e.sender.select(2);
                                e.sender.enable(e.sender.tabGroup.children().eq(0), false);
                                e.sender.enable(e.sender.tabGroup.children().eq(1), false);
                            });
                        },
                        template: kendo.template($("#professionsListTemplate").html())
                    });
                    break;
                case "mainTabtStrip-3":
                    el.html($("#coursesTabTemplate").html());
                    var Course = Parse.Object.extend("Course");
                    var courses = el.find("#courses").kendoListView({
                        dataSource: KendoUnits.setDatasourseDefaults({
                            class: Course
                        }),
                        autoBind: false,
                        template: kendo.template($("#coursesListForRegustrationTemplate").html())
                    }).data("kendoListView");
                    courses.dataSource.filter({
                        logic: "and",
                        filters: [
                            { field: "profession", operator: "eq", value: obj.profession },
                            { field: "is_verified", operator: "eq", value: true },
                        ]
                    });
                    el.find("#courses-are-selected-button").click(function () {
                        var labels = courses.wrapper.find(".k-checkbox:checked + .k-checkbox-label");
                        for (var i = 0; i < labels.length; i++) {
                            var dataItem = courses.dataItem($(labels[i]).closest("div[data-uid]")).toJSON();
                            obj.courses.push(dataItem);
                        }
                        e.sender.enable(e.sender.tabGroup.children().eq(3), true);
                        e.sender.select(3);
                    });
                    break;
                case "mainTabtStrip-4":
                    el.html($("#registrationFinishTabTemplate").html());
                    el.find("#courses").kendoListView({
                        dataSource: {
                            data: obj.courses
                        },
                        template: kendo.template($("#coursesListViewSelectedForRegustrationTemplate").html())
                    });
                    el.find("#registration-finish-button").click(function () {
                        var o = {};
                        o.name = el.find("#registration-finish-name").val();
                        o.lastname = el.find("#registration-finish-lastname").val();
                        o.email = el.find("#registration-finish-email").val();
                        o.phone = el.find("#registration-finish-phone").val();
                        o.password = el.find("#registration-finish-password").val();
                        o.username = o.email;
                        $.extend(true, o, obj);
                        console.log(o);
                        var user = new Parse.User();
                        user.set("profession", obj.profession);
                        user.signUp(o).then(function () {
                            var role = Parse.Object.extend("_Role");
                            var query = new Parse.Query(role);
                            query.equalTo("name", "Registereds").find({
                                success: function (data) {
                                    console.log(data);
                                    var r = data[0];
                                    var users = r.getUsers();
                                    users.add(user);
                                    r.save();
                                }
                            });
                            var Selected_course = Parse.Object.extend("Selected_course");
                            var selected_course = new Selected_course();
                            selected_course.save({
                                user: user,
                                courses: obj,
                            });
                            if (!currentUser) {
                                Settings.router.navigate("#login");
                            }
                            else {
                                Settings.router.navigate("#aboutUs");
                            }
                        });
                    });
                    break;
            }
        }
    }).data("kendoTabStrip").select(0);
    tabstrip.enable(tabstrip.tabGroup.children().eq(1), false);
    tabstrip.enable(tabstrip.tabGroup.children().eq(2), false);
    tabstrip.enable(tabstrip.tabGroup.children().eq(3), false);
    var Sel = Parse.Object.extend("Selected_course");
    var qu = new Parse.Query(Sel);
    qu.find({
        success: function (data) {
            console.log(data);
        }
    });
}
//# sourceMappingURL=Main.js.map