function OrderVM($scope, orderFactory)
{
    var Order = {
        "OrderID": "",
        "OrderNumber": "",
        "CustomerID":""
    }

    var Orders = {};

    $scope.AddOrder = function () {
        orderFactory.addOrder($scope.Order)
            .success(function (data, status, header, config) {
                $scope.Orders = data;
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }
}