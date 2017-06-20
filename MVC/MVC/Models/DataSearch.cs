using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Linq;
using System.Web;
using System.IO;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Diagnostics;

namespace MVC.Models
{
    public class DataSearchForThumbnail
    {
        public int[][] possibleIDs = new int[][] {
            new int[]{ 20964, 41484, 29443, 34975, 49833, 44507, 47342 },
            new int[]{ 39035, 42912, 48113, 36989, 32317, 20654, 42712 },
            new int[]{ 39750, 42581, 38270, 37957, 36765, 42918 },
            new int[]{ 21144, 32686, 35129, 37580, 38538, 40796 },
            new int[]{ 32982, 21662, 32129, 46549, 46557 },
            new int[]{ 46549, 21500, 42927, 48207, 50449, 42696 },
            new int[]{ 37770, 49522, 45405, 33135, 41419, 34407 },
            new int[]{ 4725, 38596, 36884, 42905, 49379, 44653, 42915 },
            new int[]{ 4725, 16889, 7659, 42034, 6673, 11552  }
        };
        
        public DataSearchForThumbnail()
        {
        }
        public static RootObject[] GetCompleteDataForThumbnails(string api_key, string format, string field_list)
        {
            RootObject[] rootObjectsarray = new RootObject[9];

            for (int i = 0; i < 9; i++)
            {
                DataSearchForThumbnail dt = new DataSearchForThumbnail();
                Random rnd = new Random();
                rootObjectsarray[i] = dt.GetDataForOneThumbnail(api_key, format, field_list, dt.possibleIDs[i][rnd.Next(0, dt.possibleIDs[i].Length)].ToString());
            }

            return rootObjectsarray;
        }
        public RootObject GetDataForOneThumbnail(string api_key, string format, string field_list, string game_id)
        {
            var url = String.Format("http://www.giantbomb.com/api/game/3030-" + game_id + "/?api_key=" + api_key + "&format=" + format + "&field_list=" + field_list);

            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.TryAddWithoutValidation("User-Agent", "http://developer.github.com/v3/#user-agent-required");
                var response = client.GetAsync(url).Result;

                if (response.IsSuccessStatusCode)
                {
                    // by calling .Result you are performing a synchronous call
                    var responseContent = response.Content;

                    // by calling .Result you are synchronously reading the result
                    string responseString = responseContent.ReadAsStringAsync().Result;

                    Console.WriteLine(responseString);
                    return JsonConvert.DeserializeObject<RootObject>(responseString);
                }
                else
                {
                    return null;
                }
            }
        }
        public async static Task<RootObject> GetData2(string api_key, string format, string field_list, string game_id)
        {
            using(var http = new HttpClient())
            {
                var url = String.Format("http://www.giantbomb.com/api/game/3030-" + game_id + "/?api_key=" + api_key + "&format=" + format + "&field_list=" + field_list);

                http.DefaultRequestHeaders.TryAddWithoutValidation("User-Agent", "http://developer.github.com/v3/#user-agent-required");
                HttpResponseMessage response = await http.GetAsync(url);


                if (response.IsSuccessStatusCode)
                {

                    string result = await response.Content.ReadAsStringAsync();
                    var rootResult = JsonConvert.DeserializeObject<RootObject>(result);
                    return rootResult;
                }
                else
                {
                    return null;
                }
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