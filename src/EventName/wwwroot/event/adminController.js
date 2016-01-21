"use strict";

eventApp.controller("adminController", ["$scope", "$timeout", "backendHubProxy",
    function ($scope, $timeout, backendHubProxy) {

        // for inputs
        $scope.firstName;
        $scope.lastName;

        // for alert purpose
        $scope.message = "A new person has been added!";
        $scope.showMessage = false;

        // console.log("starting connection");
        var myHub = backendHubProxy("eventHub");

        // click add
        $scope.addNewPerson = function () {
            // send person to server in order to add it to db
            myHub.invoke("addPerson", $scope.firstName, $scope.lastName);

            // clean inputs
            $scope.firstName = "";
            $scope.lastName = "";

            // show 3 sec and then hide message
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