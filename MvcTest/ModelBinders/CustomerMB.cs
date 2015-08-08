using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MvcTest.Models;

namespace MvcTest.ModelBinders
{
    public class CustomerMB : IModelBinder
    {
        public object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
        {
            HttpContextBase httpContext = controllerContext.HttpContext;
            Customer customer = new Customer();
            customer.CustomerName = httpContext.Request["CustomerName"].ToString();
            customer.CustomerCode = httpContext.Request["CustomerCode"].ToString();
            return customer;
        }
    }
}