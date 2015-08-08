

function CustomerVM($scope, customerOrderFactory) {

    $scope.Customer = {
        "CustomerName": "",
        "CustomerCode": "",
        "CustomerAmount": "",
        "CustomerAmountColor": "",
        "CustomerOrders": []
    };

    $scope.Order = {
        "OrderId":"",
        "OrderNumber": "",
        "CustomerCode": "",
        "Amount": "",
    };

    $scope.Customers = {};

    //$scope.CustomerOrders = [{}];

    $scope.getColor = function (customerAmount) {
        if (customerAmount == 0)
            return "";
        else if (customerAmount > 100)
            return "blue";
        else
            return "red";
    };

    $scope.$watch("Customer.CustomerAmount", function () {
        $scope.Customer.CustomerAmountColor = $scope.getColor($scope.Customer.CustomerAmount);
    });

    $scope.$watch("Customers", function () {
        for (var i = 0; i < $scope.Customers.length; i++)
        {
            var currCustomer = $scope.Customers[i];
            currCustomer.CustomerAmountColor = $scope.getColor(currCustomer.CustomerAmount);
        }
    });

    $scope.addCustomer = function () {
        customerOrderFactory.customerService.addCustomer($scope.Customer)
        .success(function (data, status, header, config)
        {
            $scope.Customers = data;

            $scope.Customer = {
                "CustomerName": "",
                "CustomerCode": "",
                "CustomerAmount": "",
                "CustomerAmountColor": "",
                "CustomerOrders": []
            };
        })
        .error(function (error) {
            $scope.status = 'Unable to load customer data: ' + error.message;
        });
    }

    $scope.updateCustomer = function () {
        customerOrderFactory.customerService.updateCustomer($scope.Customer)
        .success(function (data, status, header, config) {
            $scope.Customers = data;

            //$scope.Customer = {
            //    "CustomerName": "",
            //    "CustomerCode": "",
            //    "CustomerAmount": "",
            //    "CustomerAmountColor": "",
            //    "CustomerOrders": [{}]
            //};
        })
        .error(function (error) {
            $scope.status = 'Unable to load customer data: ' + error.message;
        });
    }

    $scope.Load = function () {
        customerOrderFactory.customerService.LoadCustomer()
            .success(function (data, status, header, config)
                {
                    $scope.Customers = data;
                })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }

    $scope.getCustomerById = function (customerCode) {
        customerOrderFactory.customerService.getCustomerById(customerCode)
        .success(function (data, status, header, config) {
            $scope.Customer = data[0];

            //for (var i = 0; i < data[0].CustomerOrders.length; i++)
            //{
            //    var orderObj = data[0].CustomerOrders[i];
            //    $scope.CustomerOrders.push(orderObj);
            //}
            /*
            customerOrderFactory.orderService.LoadCustomerOrders(customerCode)
            .success(function (data, status, header, config)
            {
                $scope.CustomerOrders = data;
            });
            */
        })
        .error(function (error) {
            $scope.status = 'Unable to load customer data: ' + error.message;
        });
    }

    $scope.Search = function () {
        customerOrderFactory.customerService.SearchCustomer($scope.Customer)
        .success(function (data, status, header, config){
            $scope.Customers = data;
            })
        .error(function (error) {
            $scope.status = 'Unable to load customer data: ' + error.message;
        });
    }

    $scope.AddOrder = function () {
        
        var numOfOrder = $scope.Customer.CustomerOrders.length;
        var orderID= 0;
        if (numOfOrder>0)
        {
            orderID = $scope.Customer.CustomerOrders[numOfOrder-1].OrderId + 1;
        }

        $scope.Customer.CustomerOrders.push({
            OrderId: orderID,
            OrderNumber: $scope.Order.OrderNumber,
            CustomerCode: $scope.Customer.CustomerCode,
            CustomerAmount : 0
        });

        $scope.Order = {
            "OrderId": "",
            "OrderNumber": "",
            "CustomerCode": "",
            "Amount": "",
        };
    }

    //$scope.AddOrder = function () {
    //    orderFactory.addOrder($scope.Customer)
    //        .success(function (data, status, header, config) {
    //            $scope.Customers = data;
    //        })
    //        .error(function (error) {
    //            $scope.status = 'Unable to load customer data: ' + error.message;
    //        });
    //}

    //$scope.addCustomer = function () {
    //    $http({
    //        method: "POST",
    //        data: $scope.Customer,
    //        url: "/api/Customer"
    //    }).success(function (data, status, header, config) {
    //        $scope.Customers = data;

    //        $scope.Customer = {
    //            "CustomerName": "",
    //            "CustomerCode": "",
    //            "CustomerAmount": "",
    //            "CustomerAmountColor": ""
    //        };
    //    });
    //}

    //$scope.Load = function () {
    //    $http({
    //        method: "GET",
    //        url: "/api/Customer"
    //    }).success(function (data, status, header, config) {
    //        $scope.Customers = data;
    //    });
    //}

    //$scope.Search = function () {
    //    $http({
    //        method: "GET",
    //        url: "/api/Customer?customerName=" + $scope.Customer.CustomerName
    //    }).success(function (data, status, header, config) {
    //        $scope.Customers = data;
    //    });
    //}

    $scope.Load();
}