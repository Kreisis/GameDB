using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVC.Controllers
{
    public class ErrorController : Controller
    {
        // GET: Error
        public ActionResult Index()
        {
            return View();
        }
        [HandleError]
        public ActionResult Handle404()
        {
            Response.StatusCode = 404;
            return View("Handle404");
        }
        public ActionResult Handle500()
        {
            Response.StatusCode = 500;
            return View("Handle500");
        }
    }
}