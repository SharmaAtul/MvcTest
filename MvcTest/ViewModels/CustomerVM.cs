using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MvcTest.Models;

namespace MvcTest.ViewModels
{
    public class CustomerVM
    {
        public Customer customer { get; set; }

        public List<Customer> Customers { get; set; }
    }
}