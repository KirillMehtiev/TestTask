"use strict";

eventApp.controller("adminController", ["$scope", "$timeout",
    function ($scope, $timeout) {

        // for inputs
        $scope.firstName;
        $scope.lastName;

        // for alert purpose
        $scope.message = "A new person has been added!";
        $scope.showMessage = false;

        // todo: expract to service
        console.log("starting connection");
        var myHub = $.connection.eventHub;

        $scope.addNewPerson = $.connection.hub.start({ transport: ['webSockets', 'foreverFrame', 'longPolling'] })
            .done(function () {
                console.log("connection established")
            });

        // click add
        $scope.addNewPerson = function () {
            // send person to server in ordert to add it to db
            myHub.server.addPerson($scope.firstName, $scope.lastName);

            // clean inputs
            $scope.firstName = "";
            $scope.lastName = "";

            // show 2 sec and then hide message
            $scope.showMessage = true;
            $timeout(function () {
                $scope.showMessage = false;
            }, 3000);

        }
        $scope.cleanList = function () {
            myHub.server.cleanList();
            alert("Done!")
        }
    }
]);