using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace MvcTest
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Templates",
                url: "Templates/{template}",
                defaults: new { controller = "CustomerUI", action = "Template" }
            );

            routes.MapRoute(
                name: "Script",
                url: "Script/{fileName}",
                defaults: new { controller = "CustomerUI", action = "Script" }
            );

            routes.MapRoute(
                name: "Customer",
                url: "",
                defaults: new { controller = "CustomerUI", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Default",
                url: "{*url}",
                defaults: new { controller = "CustomerUI", action = "Index" }
                //url: "{controller}/{action}/{id}",
                //defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

            routes.AppendTrailingSlash = true;
        }
    }
}