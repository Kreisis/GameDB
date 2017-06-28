namespace MVC.Models
{
    public class IndexModel
    {
        public IndexThumbnailModel[] thumbnailData;

        public IndexModel(RootObject[] rootObj)
        {
            thumbnailData = new IndexThumbnailModel[rootObj.Length];
            for (int x = 0; x < rootObj.Length; x++)
            {
                thumbnailData[x] = new IndexThumbnailModel();
                thumbnailData[x].id = rootObj[x].results.id;
                thumbnailData[x].name = rootObj[x].results.name;
                thumbnailData[x].deck = rootObj[x].results.deck;
                thumbnailData[x].imageURL = rootObj[x].results.image.medium_url;
            }
        }

    }
    public class IndexThumbnailModel
    {
        public int id { get; set; }
        public string name { get; set; }
        public string deck { get; set; }
        public string imageURL { get; set; }
    }
}