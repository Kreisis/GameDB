using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MVC.Models;
using Newtonsoft.Json;

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
            if (query != "")
            {
                DataSearchForGame Data = new DataSearchForGame("739777161fa7c039190e538d0715c9671c146cb1", "json", "image,id,deck,name,original_release_date", query);
                SearchRootObject searchResult = new SearchRootObject();
                searchResult.results = Data.AllSearchResults;
                DiscoverModel DSM = new DiscoverModel(searchResult);
                return View(DSM);
            }
            else
            {
                SearchRootObject searchResult = new SearchRootObject();
                DiscoverModel DSM = new DiscoverModel(searchResult);
                return View(DSM);
            }
            
        }

        public ActionResult History()
        {
            if(Request.Cookies["History"] != null)
            {
                string valueFromCookie = Request.Cookies["History"].Value;
                List<string> IDHistory = valueFromCookie.Split(' ').ToList();
                Console.Write(IDHistory);
                
            }
            return View();
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult Wallpapers(string query = "")
        {
            if(query == "")
            {
                RawWallpaperData Data = WallpaperSearch.FirstCall("5c008711ad4f2de33a360d34984a51b4", "32");
                WallpaperModel WM = new WallpaperModel(Data);
                return View(WM);
            }
            else
            {
                RawWallpaperData Data = WallpaperSearch.SearchCall("5c008711ad4f2de33a360d34984a51b4", query);
                WallpaperModel WM = new WallpaperModel(Data);
                return View(WM);
            }
        }

        public ActionResult ItemPage(int ID)
        {
            if(Request.Cookies["History"] == null)
            {
                HttpCookie cookie = new HttpCookie("History");
                string val = ID.ToString();

                cookie.Value = val;
                cookie.Expires = DateTime.Now.AddYears(15);
                Response.Cookies.Add(cookie);
            }
            else
            {
                string val = Request.Cookies["History"].Value;
                val = val + " " + ID.ToString();

                Response.Cookies["History"].Value = val;
            }
            RootObject rootObj = DataSearchForDescription.GetDescription("739777161fa7c039190e538d0715c9671c146cb1", "json", "image,id,deck,name,description,developers,platforms,publishers,similar_games,original_release_date", ID.ToString());
            ItemPageModel IMP = new ItemPageModel(rootObj);
            return View(IMP);
        }
    }
}