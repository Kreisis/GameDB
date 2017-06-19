using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Linq;
using System.Web;
using System.IO;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace MVC.Models
{
    public static class DataSearch
    {
        public async static Task<Results> GetData(string api_key, string format, string field_list, string game_id)
        {
            var http = new HttpClient();
            var url = String.Format("http://www.giantbomb.com/api/game/3030-" + game_id + "/?api_key="+api_key+"&format="+format+"&field_list="+field_list);

            HttpResponseMessage response = await http.GetAsync(url);
            if (response.IsSuccessStatusCode)
            {
                string result = await response.Content.ReadAsStringAsync();
                var rootResult = JsonConvert.DeserializeObject<RootObject>(result);
                return rootResult.results;
            }
            else
            {
                return null;
            }
        }
    }
    public class Image
    {
        public string icon_url { get; set; }
        public string medium_url { get; set; }
        public string screen_url { get; set; }
        public string small_url { get; set; }
        public string super_url { get; set; }
        public string thumb_url { get; set; }
        public string tiny_url { get; set; }
    }

    public class Results
    {
        public string deck { get; set; }
        public int id { get; set; }
        public Image image { get; set; }
        public string name { get; set; }
    }

    public class RootObject
    {
        public string error { get; set; }
        public int limit { get; set; }
        public int offset { get; set; }
        public int number_of_page_results { get; set; }
        public int number_of_total_results { get; set; }
        public int status_code { get; set; }
        public Results results { get; set; }
        public string version { get; set; }
    }
}