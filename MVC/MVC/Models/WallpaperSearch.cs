using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;

namespace MVC.Models
{
    public class WallpaperSearch
    {
        public static RawWallpaperData FirstCall(string api_key, string id)
        {
            var url = String.Format("https://wall.alphacoders.com/api2.0/get.php?auth="+ api_key +"&method=category&id=" + id);

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
                    return JsonConvert.DeserializeObject<RawWallpaperData>(responseString);
                }
                else
                {
                    return null;
                }
            }
        }

        public static RawWallpaperData SearchCall(string api_key, string query)
        {
            var url = String.Format("https://wall.alphacoders.com/api2.0/get.php?auth=" + api_key + "&method=search&term=" + query);

            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.TryAddWithoutValidation("User-Agent", "http://developer.github.com/v3/#user-agent-required");
                var response = client.GetAsync(url).Result;

                if (response.IsSuccessStatusCode)
                {

                    var responseContent = response.Content;

                    string responseString = responseContent.ReadAsStringAsync().Result;

                    Console.WriteLine(responseString);
                    return JsonConvert.DeserializeObject<RawWallpaperData>(responseString);
                }
                else
                {
                    return null;
                }
            }
        }
    }

    public class Wallpaper
    {
        public string id { get; set; }
        public string width { get; set; }
        public string height { get; set; }
        public string file_type { get; set; }
        public string file_size { get; set; }
        public string url_image { get; set; }
        public string url_thumb { get; set; }
        public string url_page { get; set; }
    }

    public class RawWallpaperData
    {
        public bool success { get; set; }
        public List<Wallpaper> wallpapers { get; set; }
        public string total_match { get; set; }
    }
    public class WallpaperThumbnail
    {
        public string width { get; set; }
        public string height { get; set; }
        public string url_image { get; set; }
        public string url_thumb { get; set; }
    }
    public class WallpaperModel
    {
        public List<WallpaperThumbnail> Wallpapers;
        public int maxResults { get; protected set; }
        public int resultsInRow { get; protected set; }
        public WallpaperModel(RawWallpaperData Data)
        {
            maxResults = 28;
            resultsInRow = 4;
            Wallpapers = new List<WallpaperThumbnail>();
            for(int x = 0; x < Data.wallpapers.Count; x++)
            {
                WallpaperThumbnail thumb = new WallpaperThumbnail();
                thumb.height = Data.wallpapers[x].height;
                thumb.url_image = Data.wallpapers[x].url_image;
                thumb.url_thumb = Data.wallpapers[x].url_thumb;
                thumb.width = Data.wallpapers[x].width;
                Wallpapers.Add(thumb);
            }
        }
    }
}