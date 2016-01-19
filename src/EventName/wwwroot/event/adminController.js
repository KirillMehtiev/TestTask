"use strict";

eventApp.controller("adminController", ["$scope",
    function ($scope) {

        $scope.firstName;
        $scope.lastName;

        console.log("starting connection");
        var myHub = $.connection.eventHub;

        $scope.addNewPerson = $.connection.hub.start({ transport: ['webSockets', 'foreverFrame', 'longPolling'] })
            .done(function () {
            });

        $scope.addNewPerson = function () {
            myHub.server.addPerson($scope.firstName, $scope.lastName);
            $scope.firstName = "";
            $scope.lastName = "";
        }
        $scope.cleanList = function () {
            myHub.server.cleanList();
        }
    }
]);