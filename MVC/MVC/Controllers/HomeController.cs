using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MVC.Models;
using Newtonsoft.Json;
using log4net;
using System.Diagnostics;

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
                List<string> IDHistory = val.Split(' ').ToList();
                if (IDHistory.Contains(ID.ToString()))
                {
                    IDHistory.RemoveAt(IDHistory.IndexOf(ID.ToString()));
                    val = string.Join(" ", IDHistory.ToArray());
                }
                if(IDHistory.Count >= 20)
                {
                    IDHistory.RemoveAt(19);
                    val = string.Join(" ", IDHistory.ToArray());
                }
                
                val = ID.ToString() + " " + val;

                Response.Cookies["History"].Value = val;
            }
            RootObject rootObj = DataSearchForDescription.GetDescription("739777161fa7c039190e538d0715c9671c146cb1", "json", "image,id,deck,name,description,developers,platforms,publishers,similar_games,original_release_date", ID.ToString());
            if(rootObj == null)
            {
                return RedirectToAction("Handle404", "Home");
            }
            ItemPageModel IMP = new ItemPageModel(rootObj);
            return View(IMP);
        }
    }
}