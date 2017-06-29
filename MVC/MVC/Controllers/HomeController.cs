using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MVC.Models;

namespace MVC.Controllers
{
    public class HomeController : BaseController
    {
        
        public ActionResult Index()
        {
            DataSearchForThumbnail dt = new DataSearchForThumbnail();

            RootObject[] rootObj = dt.GetCompleteDataForThumbnails("739777161fa7c039190e538d0715c9671c146cb1", "json", "image,id,deck,name");
            IndexModel IM = new IndexModel(rootObj);           
            
            return View(IM);
        }
       
        public ActionResult About()
        {
            return View();
        }   
    }
}