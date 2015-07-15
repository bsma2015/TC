window.onload = function () {
    $["material"].init();
    Parse.initialize("ZlfjhGKdRaAChnvP9x9oYYmzVMEtPYP1wGKys004", "8bzswRRhjQARgyexkb6K3Wvc8Vxu1ZXM0BOnqkaZ");
    var TestObject = Parse.Object.extend("TestObject");
    var testObject = new TestObject();
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
            pageSize: 2,
            serverPaging: true
        },
        template: kendo.template($("#headerListTemplate").html())
    }).data("kendoListView");
    $("#headerListPager").kendoPager({
        dataSource: headerList.dataSource,
        change: function (e) {
        }
    }).data("kendoPager");
};
