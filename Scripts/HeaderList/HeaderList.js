function HeaderListInit() {
    var Header = Parse.Object.extend("Header");
    var header = new Header();
    var query = new Parse.Query(Header);
    var headerList = $("#headerList").kendoListView({
        dataSource: KendoUnits.setDatasourseDefaults({ class: Header, pageSize: 3 }),
        template: kendo.template($("#headerListTemplate").html())
    }).data("kendoListView");
    $("#headerListPager").kendoPager({
        dataSource: headerList.dataSource,
        change: function (e) {
        }
    }).data("kendoPager");
    $("#header-save-button").click(function () {
        var header = new Header();
        header.save({
            title: $("#header-title").val(),
            smallDescription: $("#header-description").val()
        }, {
            success: function () {
                $("#header-title").val("");
                $("#header-description").val("");
                headerList.dataSource.read();
            }
        });
    });
}
