function HeaderListInit() {
    var Header = Parse.Object.extend("Header");
    var header = new Header();
    var query = new Parse.Query(Header);
    var headerList = $("#headerList").kendoListView({
        dataSource: {
            transport: {
                read: function (options) {
                    console.log(options);
                    var d1 = $.Deferred();
                    var d2 = $.Deferred();
                    query.count().then(function (data) {
                        d1.resolve(data);
                    });
                    query.limit(options.data.take).skip(options.data.skip).descending("updatedAt").find().then(function (data) {
                        d2.resolve(data);
                    });
                    $.when(d1, d2).then(function (v1, v2) {
                        options.success({ total: v1, data: v2 });
                    });
                }
            },
            schema: {
                data: "data",
                total: "total"
            },
            pageSize: 3,
            serverPaging: true
        },
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
//# sourceMappingURL=HeaderList.js.map