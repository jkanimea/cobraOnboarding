
app.controller("customer", function ($scope, $http, $uibModal, service) {

    //get of customer 
    //$http.get("/Customer/getCustomer")
    //.then(function (response) {       
    //    $scope.customerInfo = response.data;
    //});
    //read the data
    service.readData("/Customer/getCustomer").then(function (response) {
        $scope.customerInfo = response.data;
    });





    $scope.addCustomer = function () {
        debugger;

        $scope.Title = "Add Customer";
        var item = {};
        var modalInstance = $uibModal.open({
            templateUrl: 'myModalContent',
            controller: 'ModalInstanceCtrl',
            resolve: {
                Title: function () {
                    return $scope.Title;
                },
                    item: function () {
                        return item;
                    }
            }
        });

        //to display the results
        modalInstance.result.then(function (modalresponse) {
            debugger;
            if (modalresponse == "ok") {
                $scope.Name = names.value;
                $scope.Address1 = address1.value;
                $scope.Address2 = address2.value;
                $scope.Town_City = town_city.value;

                //add data Customer 
                service.postData("/Customer/addCustomer", { Name: $scope.Name, Address1: $scope.Address1, Address2: $scope.Address2, Town_City: $scope.Town_City })
                     .then(function (response) {
                         debugger;
                         if (response.data.Success == true) {
                             alert("success");
                             //refresh the data by reading it again
                             service.readData("/Customer/getCustomer").then(function (response) {
                                 $scope.customerInfo = response.data;
                             });

                         }
                     }, function (response) {
                         debugger;
                         if (response.data.Success == false)
                             alert("failure");
                     })

            } //end of Ok
        });

    }; // end of add Customer

    $scope.editCustomer = function (item) {
        debugger;
        alert("Edit Customer item " + item.Id)

        $scope.Title = "Edit Customer";    

        var modalInstance = $uibModal.open({
            templateUrl: 'myModalContent',
            controller: 'ModalInstanceCtrl',
            resolve: {
                Title: function () {
                    return $scope.Title;
                },
                item: function () {
                    return item;
                }
            }
        });

        //to display the results
        modalInstance.result.then(function (modalresponse) {
            debugger;
            if (modalresponse == "ok") {
                $scope.Id = id.value;
                $scope.Name = names.value;
                $scope.Address1 = address1.value;
                $scope.Address2 = address2.value;
                $scope.Town_City = town_city.value;

                //add data Customer 
                service.postData("/Customer/editCustomer", { Id:$scope.Id, Name: $scope.Name, Address1: $scope.Address1, Address2: $scope.Address2, Town_City: $scope.Town_City })
                     .then(function (response) {
                         debugger;
                         if (response.data.Success == true) {
                             alert("success");
                             //refresh the data by reading it again
                             service.readData("/Customer/getCustomer").then(function (response) {
                                 $scope.customerInfo = response.data;
                             });

                         }
                     }, function (response) {
                         debugger;
                             alert("Fail to Edit with error message " + response.statusText);
                     })

            } //end of Ok
        });
            
    };  //end of Edit Customer

    $scope.deleteCustomer = function (item) {
        debugger;

        if (confirm("Are you sure want to Delete record")) {
            //delete data Customer 
            service.postData("/Customer/deleteCustomer", { Id: item.Id})
                 .then(function (response) {
                     debugger;
                     if (response.data.Success == true) {
                         alert("success");
                         //refresh the data by reading it again
                         service.readData("/Customer/getCustomer").then(function (response) {
                             $scope.customerInfo = response.data;
                         });

                     }
                 }, function (response) {
                     debugger;
                     alert("Fail to Edit with error message " + response.statusText);
                 })
        }


    }

});

app.controller('ModalInstanceCtrl', function ($uibModalInstance, Title,$scope,item) {

    debugger;
    $scope.Title = Title;

    if (Title == "Edit Customer") {
        $scope.Id = item.Id;
        $scope.Names = item.Name;
        $scope.Address1 = item.Address1;
        $scope.Address2 = item.Address2;
        $scope.Town_City = item.Town_City;
    }


    $scope.ok = function () {
        $uibModalInstance.close('ok');
    };

    $scope.cancel = function () {
        $uibModalInstance.close('cancel');
    };
});