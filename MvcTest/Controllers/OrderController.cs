using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MvcTest.DAL;
using MvcTest.Models;

namespace MvcTest.Controllers
{
    public class OrderController : ApiController
    {
        public List<Order> Get()
        {
            var allKeys = ControllerContext.Request.GetQueryNameValuePairs();

            string customerCodeVal = allKeys.SingleOrDefault(x => x.Key == "customerCode").Value;

            CustomerDB db = new CustomerDB();
            List<Order> orders = null;

            if (!String.IsNullOrEmpty(customerCodeVal))
            {
                orders = (from x in db.Orders
                             where x.CustomerCode == customerCodeVal
                             select x).ToList<Order>();
            }
            else
            {
                orders = db.Orders.ToList<Order>();
            }

            return orders;
        }
    }
}
