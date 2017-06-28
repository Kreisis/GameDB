using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace MVC.Models
{
    public class CookieManager
    {
        int cookieExpirationTimeInYears = 15;
        int historyMaxSize = 20;
        public void HandleCookie(string id)
        {
            if (HttpContext.Current.Request.Cookies["History"] == null)
            {
                HttpCookie cookie = new HttpCookie("History");
                string val = id.ToString();

                cookie.Value = val;
                cookie.Expires = DateTime.Now.AddYears(cookieExpirationTimeInYears);
                HttpContext.Current.Response.Cookies.Add(cookie);
            }
            else
            {
                string val = HttpContext.Current.Request.Cookies["History"].Value;
                List<string> IDHistory = val.Split(',').ToList();
                if (IDHistory.Contains(id.ToString()))
                {
                    IDHistory.RemoveAt(IDHistory.IndexOf(id.ToString()));
                    val = string.Join(",", IDHistory.ToArray());
                }
                if (IDHistory.Count >= historyMaxSize)
                {
                    IDHistory.RemoveAt(historyMaxSize - 1);
                    val = string.Join(",", IDHistory.ToArray());
                }

                val = id.ToString() + "," + val;

                HttpContext.Current.Response.Cookies["History"].Value = val;
            }
        }
    }
}