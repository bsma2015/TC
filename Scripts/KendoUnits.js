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
                        console.log(v1, JSON.parse(JSON.stringify(v2)));
                        options.success({ total: v1, data: JSON.parse(JSON.stringify(v2)) });
                    });
                },
                update: function (options) {
                    console.log("update", options);
                    var obj = new cla();
                    obj.save(options.data, {
                        success: function (data) {
                            console.log(data.toJSON());
                            options.success(data.toJSON());
                        },
                        error: function (data) {
                            options.error(data);
                        }
                    });
                },
                create: function (options) {
                    console.log("create", options);
                    var obj = new cla();
                    var acl = new Parse.ACL(Parse.User.current());
                    acl.setRoleWriteAccess("Super Admin", true);
                    obj.setACL();
                    obj.save(options.data, {
                        success: function (data) {
                            console.log(data.toJSON());
                            options.success(data.toJSON());
                        },
                        error: function (data) {
                            options.error(data);
                        }
                    });
                },
                destroy: function (options) {
                    console.log("destroy");
                }
            },
            schema: {
                data: "data",
                total: "total",
                model: {
                    id: "objectId",
                    fields: {}
                }
            },
            pageSize: 6,
        };
        var result = $.extend(true, ds, i);
        return result;
    }
    KendoUnits.setDatasourseDefaults = setDatasourseDefaults;
})(KendoUnits || (KendoUnits = {}));
//# sourceMappingURL=KendoUnits.js.map