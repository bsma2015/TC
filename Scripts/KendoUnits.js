var KendoUnits;
(function (KendoUnits) {
    "use strict";
    function setDatasourseDefaults(i) {
        var cla = i.class;
        var ds = {
            transport: {
                read: function (options) {
                    var query = new Parse.Query(cla);
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
                },
                update: function (options) {
                    alert(234);
                    console.log(options);
                },
                create: function (options) {
                    console.log(options);
                },
                destroy: function (options) {
                    console.log(options);
                },
            },
            schema: {
                data: "data",
                total: "total"
            },
            pageSize: 6,
            serverPaging: true,
            serverFiltering: true,
        };
        var result = $.extend(true, ds, i);
        return result;
    }
    KendoUnits.setDatasourseDefaults = setDatasourseDefaults;
})(KendoUnits || (KendoUnits = {}));
