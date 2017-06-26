using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using log4net;

namespace MVC.Controllers
{
    public class ErrorController : Controller
    {
        ILog log = log4net.LogManager.GetLogger(typeof(ErrorController));
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
        [HandleError]
        public ActionResult Handle500(Exception ex)
        {
            
            Response.StatusCode = 500;
            return View("Handle500");
        }
    }
}