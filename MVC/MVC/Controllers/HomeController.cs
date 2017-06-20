using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MVC.Models;

namespace MVC.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            RootObject[] rootObj = DataSearchForThumbnail.GetCompleteDataForThumbnails("739777161fa7c039190e538d0715c9671c146cb1", "json", "image,id,deck,name");

            ViewData["ThumbnailDataArray"] = rootObj;
            
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}