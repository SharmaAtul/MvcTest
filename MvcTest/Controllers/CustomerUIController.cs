using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MvcTest.Models;
using MvcTest.DAL;
using MvcTest.ViewModels;
using MvcTest.ModelBinders;

namespace MvcTest.Controllers
{
    public class CustomerUIController : Controller
    {
        //
        // GET: /Customer/

        //public ActionResult Index()
        //{
        //    return View();
        //}

        public ActionResult Login()
        {
            return View();
        }

        public ActionResult GetList()
        {
            return View("ObservationList");
        }

        //public ActionResult GetDetail()
        //{
        //    return View("ObservationDetail");
        //}

        public ActionResult GetDetail()
        {
            return View("ObservationDetail");
        }

        public ActionResult Question()
        {
            return View("ucQuestion");
        }

        public ActionResult ObservationEdit()
        {
            return View();
        }

        public ActionResult ObservationView()
        {
            return View();
        }

        public ActionResult AddCustomer()
        {
            return View();
        }

        //public ActionResult SubmitCustomer(Customer obj)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        CustomerDB db = new CustomerDB();
        //        db.Customers.Add(obj);
        //        db.SaveChanges();

        //        CustomerVM vm = new CustomerVM();
        //        vm.customer = new Customer();
        //        vm.Customers = db.Customers.ToList<Customer>();

        //        return View("ViewCustomer", vm);
        //    }
        //    else {
        //        return View("AddCustomer", obj);
        //    }
        //}

        //public ActionResult SearchCustomer()
        //{
        //    string searchString = Request.Form["txtCustomerName"] == null ? "" : Request.Form["txtCustomerName"].ToString();
        //    CustomerDB db = new CustomerDB();
        //    CustomerVM vm = new CustomerVM();
        //    vm.customer = new Customer();

        //    if(searchString=="")
        //        vm.Customers = db.Customers.ToList<Customer>();
        //    else
        //    vm.Customers = (from x in db.Customers
        //                        where x.CustomerName==searchString
        //                        select x).ToList<Customer>();

        //    return View("ViewCustomer", vm);
        //}
    }
}
