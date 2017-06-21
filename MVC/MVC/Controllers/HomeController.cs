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

            IndexModel IM = new IndexModel(rootObj);           
            
            return View(IM);
        }

        public ActionResult Discover(string query = "")
        {
            SearchRootObject searchResult = DataSearchForGame.GetDescription("739777161fa7c039190e538d0715c9671c146cb1", "json", "image,id,deck,name,original_release_date", query);
            DiscoverModel DSM = new DiscoverModel(searchResult);
            if (query != "")
            {
                
                
            }
            else
            {
                
            }
            return View(DSM);
            
        }

        public ActionResult History()
        {
            return View();
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult Wallpapers()
        {
            return View();
        }

        public ActionResult ItemPage(int ID)
        {
            RootObject rootObj = DataSearchForDescription.GetDescription("739777161fa7c039190e538d0715c9671c146cb1", "json", "image,id,deck,name,description,developers,platforms,publishers,similar_games,original_release_date", ID.ToString());
            ItemPageModel IMP = new ItemPageModel(rootObj);
            return View(IMP);
        }
    }
}