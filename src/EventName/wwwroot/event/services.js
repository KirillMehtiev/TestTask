"use strict";

eventApp.factory("backendHubProxy",
    function () {
        //console.log("starting connection");
        //var hub = $.connection.eventHub;
        //$.connection.hub.start({ transport: ['webSockets', 'foreverFrame', 'longPolling'] })
        //    .done(function () {
        //        console.log("created connection");
        //        return hub;
        //    });
        //return hub;
    }
);
//function ($rootScope, backendServerUrl) {
//    function backendFactory(serverUrl, hubName) {
//        var connection = $.hubConnection(backendServerUrl);
//        var proxy = connection.createHubProxy(hubName);

//        // use only webSockets and longPolling for transport purpose 
//        connection.start({ transport: ['webSockets', 'longPolling'] }).done(function () { });

//        return {
//            on: function (eventName, callback) {
//                proxy.on(eventName, function (result) {
//                    $rootScope.$apply(function () {
//                        if (callback) {
//                            callback(result);
//                        }
//                    });
//                });
//            },
//            invoke: function (methodName, data, callback) {
//                proxy.invoke(methodName, data)
//                    .done(function (result) {
//                        $rootScope.$apply(function () {
//                            if (callback) {
//                                callback(result);
//                            }
//                        });
//                    });
//            }
//        };
//    };

//    return backendFactory;
//}
