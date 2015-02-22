/// <reference path="../sdk/jquery/jquery-1.7.1.min.js" />
/// <reference path="../sdk/jquery.mobile-1.4.1/jquery.mobile-1.4.1.js" />
/// <reference path="../sdk/plugIn/baiduTpls.js" />


function cs_getUrlContent(aUrl, aCallback) {
    $.ajax({
        url: 'getData.aspx',
//        async: false,
        data: { Url: aUrl },
        success: function ( res ) {
            if (aCallback) {
                try {
                    aCallback(res);
                }
                catch (cer) { ; }
            }
        },
        error: function (a,b,c) {
            if (aCallback) {
                try {
                    aCallback('');
                }
                catch (cer) { ; }
            }
        }
    });
}
function cs_getTpl(aTplpath, aCallback) {
    $.ajax({
        url: aTplpath,
        data: { tm: Math.random()},
        success: function ( res ) {
            if (aCallback) {
                try {
                    aCallback(res);
                }
                catch (cer) { ; }
            }
        },
        error: function (a,b,c) {
            if (aCallback) {
                try {
                    aCallback('');
                }
                catch (cer) { ; }
            }
        }
    });
}

var DataList = [];
//下载有效数据
function cs_getData(aDataUrl, aCallback) {
    //aDataUrl = "ScheduleByDisciplineSingle/ScheduleByDisciplineSingle.6.txt";
    var aLastTmUrl = "http://results.liaoning2013.com.cn/Info2013/getLastModified/json/zh-cn/CRS/" + aDataUrl + "?tm=" + Math.random();
    var aJsonUrl = "http://results.liaoning2013.com.cn/Info2013/json/zh-cn/CRS/" + aDataUrl + "?tm=" + Math.random();

    cs_getUrlContent(aLastTmUrl, function (aRes) {
        var aInfo = cs_getDataInfo(aDataUrl);
        if (aInfo.LastTm != aRes && aRes != "") {
            cs_getUrlContent(aJsonUrl, function (aJson) {
                if (aInfo.LastTm == 0) {
                    DataList.push(aInfo);
                }
                aInfo.LastTm = aRes;
                aInfo.Content = aJson; 
                if (aCallback) {
                    try {
                        aCallback(aInfo.Content);
                    }
                    catch (cer) { ; }
                }
            });
        }
        else {
            if (aCallback) {
                try {
                    aCallback(aInfo.Content);
                }
                catch (cer) { ; }
            }
        }
    });
}

function cs_getDataInfo(aDataPath) {
    var aInfo = new TDataInfo();
    try{
        for( var i=0;i< DataList.length;i++){
            if ( DataList[i].DataPath == aDataPath){
                aInfo = DataList[i];
                break;
            }
        }
    }
    catch(cer){;}
    return aInfo;
}

function TDataInfo() {
    this.DataPath = '';
    this.LastTm = 0;
    this.Content = '';


}
