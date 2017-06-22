﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC.Models
{
    public class DiscoverModel
    {
        public List<SearchResultModel> SearchResult;
        public int maxResults;
        public DiscoverModel(SearchRootObject rootObj)
        {
            maxResults = 20;
            SearchResult = new List<SearchResultModel>();
            if(rootObj.results != null)
            {
                for (int x = 0; x < rootObj.results.Count; x++)
                {
                    SearchResultModel temp = new SearchResultModel();
                    temp.name = rootObj.results[x].name;
                    temp.deck = rootObj.results[x].deck;
                    temp.id = rootObj.results[x].id;
                    if(rootObj.results[x].image != null && rootObj.results[x].image.medium_url != null)
                    {
                        temp.imageURL = rootObj.results[x].image.medium_url;
                    }
                    else
                    {
                        temp.imageURL = "http://www.jordans.com/~/media/jordans%20redesign/no-image-found.ashx?h=275&la=en&w=275&hash=F87BC23F17E37D57E2A0B1CC6E2E3EEE312AAD5B";
                    }
                    SearchResult.Add(temp);
                }
            }
            
        }
    }
  
    public class SearchResultModel
    {
        public string name { get; set; }
        public string deck { get; set; }
        public string imageURL { get; set; }
        public int id { get; set; }
    }
}