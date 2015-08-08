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
    public class CustomerController : ApiController
    {
        public List<Customer> Get()
        {
            var allKeys = ControllerContext.Request.GetQueryNameValuePairs();

            string customerNameVal = allKeys.SingleOrDefault(x => x.Key == "customerName").Value;
            string customerCodeVal = allKeys.SingleOrDefault(x => x.Key == "customerCode").Value;

            CustomerDB db = new CustomerDB();
            List<Customer> customers = null;

            if (!String.IsNullOrEmpty(customerNameVal))
            {
                customers = (from x in db.Customers
                             where x.CustomerName == customerNameVal
                             select x).ToList<Customer>();

                string customerCode = customers[0].CustomerCode;

                customers[0].CustomerOrders = (from x in db.Orders
                                       where x.CustomerCode == customerCode
                                       select x).ToList<Order>();
            }
            else if (!String.IsNullOrEmpty(customerCodeVal))
            {
                customers = (from x in db.Customers
                             where x.CustomerCode == customerCodeVal
                             select x).ToList<Customer>();

                string customerCode = customers[0].CustomerCode;

                customers[0].CustomerOrders = (from x in db.Orders
                                       where x.CustomerCode == customerCode
                                       select x).ToList<Order>();
            }
            else
            {
                customers = db.Customers.ToList<Customer>();
            }

            return customers;
        }

        public List<Customer> Post(Customer oCustomer)
        {
            CustomerDB db = new CustomerDB();
            if (ModelState.IsValid)
            {
                db.Customers.Add(oCustomer);
                foreach (Order order in oCustomer.CustomerOrders)
                {
                    db.Orders.Add(new Order
                    {
                        OrderNumber = order.OrderNumber,
                        CustomerCode = order.CustomerCode,
                        Amount = order.Amount
                    });
                }

                db.SaveChanges();
            }
            
            return db.Customers.ToList<Customer>();
        }

        public List<Customer> Put(Customer oCustomer)
        {
            CustomerDB db = new CustomerDB();
            if (ModelState.IsValid)
            {
                Customer customer = (from x in db.Customers
                             where x.CustomerCode == oCustomer.CustomerCode
                             select x).Single<Customer>();

                customer.CustomerAmount = oCustomer.CustomerAmount;
                customer.CustomerName = oCustomer.CustomerName;

                List<Order> customerOrders = (from x in db.Orders
                                              where x.CustomerCode == oCustomer.CustomerCode
                                              select x).ToList<Order>();

                foreach (Order order in oCustomer.CustomerOrders)
                { 
                    //check if order exists than update else insert
                    Order currentOrder = customerOrders.Find(i => i.OrderId == order.OrderId);
                    if (currentOrder != null)
                    {
                        //update
                        currentOrder.OrderNumber = order.OrderNumber;
                        currentOrder.Amount = order.Amount;
                    }
                    else
                    {
                        //insert
                        db.Orders.Add(new Order { 
                            OrderNumber = order.OrderNumber,
                            CustomerCode = order.CustomerCode,
                            Amount = order.Amount
                        });
                    }
                }

                db.SaveChanges();
            }

            return db.Customers.ToList<Customer>();
        }
    }
}
