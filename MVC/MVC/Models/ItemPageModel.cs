using System.Collections.Generic;

namespace MVC.Models
{
    public class ItemPageModel
    {
        public ItemDataModel itemData;

        public ItemPageModel(RootObject rootObj)
        {
            itemData = new ItemDataModel();
            itemData.deck = rootObj.results.deck;
            itemData.description = rootObj.results.description;
            itemData.id = rootObj.results.id;
            itemData.imageURL = rootObj.results.image.medium_url;
            itemData.name = rootObj.results.name;
            itemData.original_release_date = rootObj.results.original_release_date;
            itemData.platforms = rootObj.results.platforms;
            itemData.developers = rootObj.results.developers;
            itemData.publishers = rootObj.results.publishers;
        }
    }

    public class ItemDataModel
    {
        public string deck { get; set; }
        public string description { get; set; }
        public int id { get; set; }
        public string imageURL { get; set; }
        public string name { get; set; }
        public string original_release_date { get; set; }
        public List<Platform> platforms { get; set; }
        public List<Developer> developers { get; set; }
        public List<Publisher> publishers { get; set; }
    }
}