function customerFactory($http){

    var urlBase = '/api/Customer';
    var customerFactory = {};

    customerFactory.LoadCustomer = function () {
        return $http.get(urlBase);
    }

    customerFactory.SearchCustomer = function (cust) {
        return $http.get(urlBase + "?customerName=" + cust.CustomerName);
    }

    customerFactory.addCustomer = function (cust) {
        return $http.post(urlBase, cust);
    }

    customerFactory.updateCustomer = function (cust) {
        return $http.put(urlBase, cust);
    }

    customerFactory.getCustomerById = function (customerCode) {
        return $http.get(urlBase + "?customerCode=" + customerCode);
    }

    return customerFactory;
}

function customerOrderFactory(customerFactory, orderFactory) {
    return {
        customerService: customerFactory
        ,orderService: orderFactory
    };
}