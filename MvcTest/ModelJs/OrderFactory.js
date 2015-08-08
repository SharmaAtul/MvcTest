function orderFactory($http)
{
    var urlBase = '/api/Order';
    var orderFactory = {};

    orderFactory.LoadCustomerOrders = function (customerCode) {
        return $http.get(urlBase + "?customerCode=" + customerCode);
    }

    //customerFactory.SearchCustomer = function (cust) {
    //    return $http.get(urlBase + "?customerName=" + cust.CustomerName);
    //}

    orderFactory.addOrder = function (cust, order) {
        return $http.post(urlBase, order);
    }

    return orderFactory;
}