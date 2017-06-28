using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MVC.Models;

namespace MVC.Controllers
{
    public class WallpaperController : BaseController
    {
        // GET: Wallpaper
        public ActionResult Index()
        {
            RawWallpaperData Data = WallpaperSearch.FirstCall("5c008711ad4f2de33a360d34984a51b4", "32");
            WallpaperModel WM = new WallpaperModel(Data);
            return View("Wallpapers", WM);
        }
        public ActionResult Search(string query = "witcher")
        {
            RawWallpaperData Data = WallpaperSearch.SearchCall("5c008711ad4f2de33a360d34984a51b4", query);
            WallpaperModel WM = new WallpaperModel(Data);
            return View("Wallpapers", WM);
        }
    }
}