using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC.Models
{
    public class DiscoverModel
    {
        public List<SearchResultModel> SearchResult;
        public DiscoverModel(SearchRootObject rootObj)
        {
            SearchResult = new List<SearchResultModel>();
            for(int x = 0; x < rootObj.results.Count; x++)
            {
                SearchResultModel temp = new SearchResultModel();
                temp.name = rootObj.results[x].name;
                temp.deck = rootObj.results[x].deck;
                temp.imageURL = rootObj.results[x].image.medium_url;
                SearchResult.Add(temp);
            }
        }
    }
  
    public class SearchResultModel
    {
        public string name { get; set; }
        public string deck { get; set; }
        public string imageURL { get; set; }

    }
}