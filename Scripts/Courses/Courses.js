function coursesListInit() {
    var Course = Parse.Object.extend("Course");
    console.log(KendoUnits.setDatasourseDefaults({
        class: Course
    }));
    var list = $("#courses").kendoListView({
        dataSource: new kendo.data.DataSource(KendoUnits.setDatasourseDefaults({
            class: Course,
            schema: {
                model: {
                    fields: {
                        is_verified: { type: "boolean" },
                        name: { type: "string" },
                        department: { type: "string" },
                        profession: { type: "string" }
                    }
                }
            }
        })),
        dataBound: function () {
            console.log("databaound");
        },
        edit: function (e) {
            var departments = e.sender.wrapper.find("#departments-dropdownlist").kendoDropDownList({
                dataSource: {
                    data: resources.departments
                },
                dataTextField: "name",
                dataValueField: "value",
                optionLabel: "აირჩიეთ დეპარტამენტი",
                change: function (e) {
                    var val = e.sender.value();
                    console.log(val);
                    if (val) {
                        professions.enable(true);
                        professions.dataSource.filter({ field: "department", operator: "eq", value: val });
                    }
                    else {
                        professions.enable(false);
                    }
                }
            }).data("kendoDropDownList");
            var professions = e.sender.wrapper.find("#professions-dropdownlist").kendoDropDownList({
                dataSource: {
                    data: resources.professions
                },
                enable: false,
                dataTextField: "name",
                dataValueField: "value",
                cascadeFrom: "departments-dropdownlist",
                optionLabel: "აირჩიეთ პროფესია"
            }).data("kendoDropDownList");
        },
        template: kendo.template($("#coursesListTemplate").html()),
        editTemplate: kendo.template($("#coursesListEditTemplate").html())
    }).data("kendoListView");
    $("#course-add-button").click(function () {
        list.add({});
    });
}
