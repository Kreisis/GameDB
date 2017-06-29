﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MVC.Models;

namespace MVC.Controllers
{
    public class GameController : BaseController
    {
        // GET: Game
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ItemPage(int id)
        {
            RootObject rootObj = DataSearchForDescription.GetDescription("739777161fa7c039190e538d0715c9671c146cb1", "json", "image,id,deck,name,description,developers,platforms,publishers,similar_games,original_release_date", id.ToString());
            if (rootObj == null)
            {
                return RedirectToAction("Handle404", "Home");
            }
            CookieManager CM = new CookieManager();
            CM.HandleCookie(id.ToString());
            ItemPageModel IMP = new ItemPageModel(rootObj);
            return View(IMP);
        }

    }
}