using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.Text;
using System.Net;

public partial class getData : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack) {
            try {
                DoResponse();
            }
            catch (Exception er) { ;}
        }
    }

    void DoResponse() {
        string aUrl = Request["Url"].ToString();
        string aContent = getHttpFile(aUrl);
        Response.Write(aContent);
        try {
            Response.End();
        }
        catch (Exception er) { ;}

    }

    public string getHttpFile(string aPath)
    {
        string aRes = "";
        try
        {
            string aUrl = aPath; 
            HttpWebRequest loHttp = (HttpWebRequest)WebRequest.Create(aUrl);
            loHttp.Timeout = 10000;     // 10 secs
            loHttp.UserAgent = "Web Client";
            HttpWebResponse loWebResponse = (HttpWebResponse)loHttp.GetResponse();
            Encoding enc = Encoding.GetEncoding(65001);
            StreamReader loResponseStream = new StreamReader(loWebResponse.GetResponseStream(), enc);
            string lcHtml = loResponseStream.ReadToEnd();
            aRes = lcHtml;
            loWebResponse.Close();
            loResponseStream.Close();
        }
        catch (Exception er) { ;}
        return aRes;
    }
}