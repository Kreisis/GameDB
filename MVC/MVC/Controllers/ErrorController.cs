﻿using System.Web.Mvc;

namespace MVC.Controllers
{
    public class ErrorController : BaseController
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
        [HandleError]
        public ActionResult Handle500()
        {
            
            Response.StatusCode = 500;
            return View("Handle500");
        }
    }
}