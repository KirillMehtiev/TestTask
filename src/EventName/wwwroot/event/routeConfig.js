"use strict";

eventApp.config(["$routeProvider",
    function ($routeProvider) {
        $routeProvider.
            when("/eventName", {
                templateUrl: "/event/partials/worker.html",
                controller: "eventController"
            }).
            when("/admin", {
                templateUrl: "/event/partials/admin.html",
                controller: "adminController"
            }).
            otherwise({
                redirectTo: "/eventName"
            })
    }
]);