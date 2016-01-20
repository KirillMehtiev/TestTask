"use strict";

eventApp.controller('eventController', ["$scope", "$rootScope",
    function ($scope, $rootScope) {

        // vars for search 
        $scope.searchText = "";
        $scope.selectFilter = [];
        $scope.selectFilter.mode = ""; // select radio
        $scope.categories = [
            { lable: "All", value: "" },
            { lable: "Checked", value: true },
            { lable: "Unchecked", value: false }
        ];

        // for loading purpose
        $scope.isBusy = false;

        $scope.tableHead = ["#", "First Name", "Last Name", "Chekin"];
        $scope.humans = [];

        console.log("starting connection");
        var myHub = $.connection.eventHub;

        // add client-side method to hub
        myHub.client.getPeople = function (data) {
            $scope.humans = data;
            $scope.isBusy = true;
            $rootScope.$apply();
        }

        // func handls when server sends person to update
        myHub.client.checkinOthers = function (updPerson) {
            updatePersonLocaly(updPerson, $scope.humans);
        }

        // todo: extract it to service
        $.connection.hub.start({ transport: ['webSockets', 'foreverFrame', 'longPolling'] })
            .done(function () {
                console.log("created connection myHub Id = " + $.connection.hub.id);
                // call server-side method
                myHub.server.getData();
            })
            .fail(function (error) {
                console.log("Error: " + error);
            });

        // click ckeckin()
        $scope.checkin = function (person) {
            var updPerson = updatePersonLocaly(person, $scope.humans);
            // sent to other conneced clients
            myHub.server.updatePerson(updPerson);
        }

        // get person and list of people
        // find person by id and change his prop (isHere)
        // return updated person
        var updatePersonLocaly = function (person, mas) {
            var temp = mas;
            for (var i = 0; i < temp.length; i++) {
                if (temp[i].id === person.id) {
                    if (temp[i].isHere) {
                        temp[i].isHere = false;
                        $('#row' + temp[i].id).removeClass("success");
                        $('#btn' + temp[i].id).val("Checkin");
                        return temp[i];
                    } else {
                        temp[i].isHere = true;
                        $('#row' + temp[i].id).addClass("success");
                        $('#btn' + temp[i].id).val("Cancel");
                        return temp[i];
                    }
                }
            }
        }
    }
]);
