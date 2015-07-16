function coursesListInit() {
    var Course = Parse.Object.extend("Course");
    console.log(KendoUnits.setDatasourseDefaults({
        class: Course
    }));
    var list = $("#courses").kendoListView({
        dataSource: KendoUnits.setDatasourseDefaults({
            class: Course,
            schema: {
                model: {
                    fields: {
                        attributes: {}
                    }
                }
            }
        }),
        dataBound: function () {
            console.log("databaound");
        },
        template: kendo.template($("#coursesListTemplate").html()),
        editTemplate: kendo.template($("#coursesListEditTemplate").html())
    }).data("kendoListView");
}
