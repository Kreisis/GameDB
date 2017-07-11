using System.Collections.Generic;
using System.Text.RegularExpressions;
using HtmlAgilityPack;

namespace MVC.Models
{
    public class ItemPageModel
    {
        public ItemDataModel itemData;

        public ItemPageModel(RootObject rootObj)
        {
            itemData = new ItemDataModel();
            itemData.deck = rootObj.results.deck;
            itemData.description = CleanHTML(rootObj.results.description);
            itemData.id = rootObj.results.id;
            itemData.imageURL = rootObj.results.image.medium_url;
            itemData.name = rootObj.results.name;
            itemData.original_release_date = rootObj.results.original_release_date;
            itemData.platforms = rootObj.results.platforms;
            itemData.developers = rootObj.results.developers;
            itemData.publishers = rootObj.results.publishers;
        }
        
        private string CleanHTML(string input)
        {
            string badNodesXPATH = "//abbr|a|acronym|address|applet|area|base|basefont|bdo|big|body|button|caption|center|cite|code|col |colgroup|dd|del|dir|div|dfn|dl|dt|embed|fieldset|font|form|frame |frameset|head|html|iframe|img|input|ins|isindex|kbd|label|legend |link|map|menu|meta|noframes|noscript|object|optgroup|option |param|pre|q|s|samp|script|select|small|span|strike|style|table |tbody|td|textarea|tfoot|th|thead|title|tr|tt|var|xmp|figure";
            HtmlDocument doc = new HtmlDocument();
            doc.LoadHtml(input);

            HtmlNodeCollection rootNodes = doc.DocumentNode.SelectNodes(badNodesXPATH);

            if(rootNodes != null)
            {
                foreach (HtmlNode node in rootNodes)
                {

                    node.Remove();
                }
            }
            

            HtmlNodeCollection nodes = doc.DocumentNode.SelectNodes("*");
            
            if (nodes != null)
            {
                RemoveBadNodes(nodes, badNodesXPATH, doc);
            }

            
            return doc.DocumentNode.OuterHtml;
        }
        private void RemoveBadNodes(HtmlNodeCollection rootNodes, string XPATH, HtmlDocument doc)
        {
            foreach(HtmlNode node in rootNodes)
            {
                HtmlNodeCollection badNodes = node.SelectNodes(XPATH);
                if(badNodes != null)
                {
                    foreach(HtmlNode badNode in badNodes)
                    {
                        
                        
                        var replacement = doc.CreateTextNode(badNode.InnerText);
                        badNode.ParentNode.ReplaceChild(replacement, badNode);
                    }
                }
                HtmlNodeCollection allChildNodes = node.SelectNodes("*");
                if(allChildNodes != null)
                {
                    RemoveBadNodes(allChildNodes, XPATH, doc);
                }
            }
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