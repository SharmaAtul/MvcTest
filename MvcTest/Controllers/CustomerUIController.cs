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

        public ActionResult Index()
        {
            return View();
        }

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

        public ActionResult Template(string template)
        {
            switch (template.ToLower())
            {
                case "login":
                    return PartialView("~/Views/CustomerUI/Login.cshtml");
                case "home":
                    return PartialView("~/Views/CustomerUI/Home.cshtml");
                case "default":
                    return PartialView("~/Views/CustomerUI/Default.cshtml");
                case "observation":
                    return PartialView("~/Views/CustomerUI/Observation.cshtml");
                case "observationlist":
                    return PartialView("~/Views/CustomerUI/ObservationList.cshtml");
                case "observationdetail":
                    return PartialView("~/Views/CustomerUI/ObservationDetail.cshtml");
                case "searchuserpopup":
                    return PartialView("~/Views/Shared/SearchUserPopup.cshtml");
                case "actionitempopup":
                    return PartialView("~/Views/Shared/ActionItemPopup.cshtml");
                case "attachmentpopup":
                    return PartialView("~/Views/Shared/AttachmentPopup.cshtml");
                case "obsresultpopup":
                    return PartialView("~/Views/Shared/ObsResultPopup.cshtml");
                case "obsresultobservationpopup":
                    return PartialView("~/Views/Shared/ObsResultObservationPopup.cshtml");
                case "breadcrumb":
                    return PartialView("~/Views/Shared/breadcrumb.cshtml");
                default:
                    throw new Exception("template not known");
            }
        }

        public ActionResult Script(string fileName)
        {
            return File(System.IO.File.ReadAllBytes(Server.MapPath("/"+fileName.Replace("|","/"))), "text/javascript"); 
        }

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
