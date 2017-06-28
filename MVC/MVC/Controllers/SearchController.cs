using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using MVC.Models;

namespace MVC.Controllers
{
    public class SearchController : BaseController
    {
        // GET: Search
        public ActionResult Index()
        {
            return RedirectToAction("Discover", "Search");
        }
        public ActionResult Discover(string query = "")
        {
            query = query.Trim();
            SearchRootObject searchResult = new SearchRootObject();

            if (query != "")
            {
                DataSearchForGame Data = new DataSearchForGame("739777161fa7c039190e538d0715c9671c146cb1", "json", "image,id,deck,name,original_release_date", query);
                searchResult.results = Data.AllSearchResults;
            }

            DiscoverModel DSM = new DiscoverModel(searchResult);
            return View("Discover", DSM);
        }

        public ActionResult History()
        {
            if (Request.Cookies["History"] != null)
            {
                string valueFromCookie = Request.Cookies["History"].Value;
                List<string> IDHistory = valueFromCookie.Split(',').ToList();
                DataSearchForHistory Data = new DataSearchForHistory(IDHistory);

                RootObject[] rootObj = Data.SearchHistoryData;
                HistoryModel HM = new HistoryModel(rootObj);
                return View(HM);

            }
            else
            {
                HistoryModel HM = null;
                return View(HM);
            }
        }
    }
}