/// <reference path="../../sdk/jqmsdk/jquery-1.7.1.min.js" />
/// <reference path="../../sdk/jqmsdk/jquery.mobile-1.3.1.min.js" />
/// <reference path="../app.js" />
/// <reference path="../common.js" />
/// <reference path="../../sdk/plugIn/baiduTpls.js" />

function TEScheduleData() {
    this.ScheduleValue = '';    
    this.ScheduleList = [];
}
function TEScheduleDetailData() {
    this.LiveReportDataID = 0;
    this.ScheduleHead = [];
    this.ScheduleDetailList = [];
}
function TESchedule() {
    this.Load = function (value) {
        var me = App.Modules.Schedule;
        try {
            me.ScheduleData.ScheduleValue = value;
            this.Refresh();
        }
        catch (cer) { ; }
    }

    this.Refresh = function () {
        var me = App.Modules.Schedule;
        var value = me.ScheduleData.ScheduleValue;
        try {
            cs_getData('ScheduleByDisciplineSingle/ScheduleByDisciplineSingle.33.txt', function (res) {
                var aJson = eval('(' + res + ')');
                for (var i = 0, j = 0; j < aJson.Message.Row[0].Row1.length; j++) {
                    if (value == aJson.Message.Row[0].Row1[j].BASE1_EventCode
                        || value == aJson.Message.Row[0].Row1[j].StartDate1) {
                        me.ScheduleData.ScheduleList[i] = aJson.Message.Row[0].Row1[j];
                        i = i + 1;
                    }
                }
                me.Display();
            });
        }
        catch (cer) { ; }
    }

    this.Display = function () {
        var me = App.Modules.Schedule;
        try {
            cs_getTpl('app/Tpls/tplSchedule.htm', function (sTplContent) {
                var sHtml = bt(sTplContent, { tplData: me.ScheduleData.ScheduleList });
                $('#Schedule_Detail').empty();
                $('#Schedule_Detail').html(sHtml);
                $.mobile.changePage('#Schedule');
                $('#Schedule_Detail').trigger('create');           
            });
        }
        catch (cer) { ; }
    }
    
    this.DetailLoad = function (LiveReportDataID) {
        var me = App.Modules.Schedule;
        try {
            me.ScheduleDetailData.LiveReportDataID = LiveReportDataID;
            me.DetailRefresh();
        }
        catch (cer) { ; }
    }

    this.DetailRefresh = function () {
        var me = App.Modules.Schedule;
        var LiveReportDataID = me.ScheduleDetailData.LiveReportDataID;
        try {
            cs_getData('LiveResultHeadByID/TE/LiveResultHeadByID.TE.' + LiveReportDataID + '.txt', function (res) {
                var aJson = eval('(' + res + ')');
                me.ScheduleDetailData.ScheduleHead = aJson.Message.Row[0];
                cs_getData('LiveResultByID/TE/LiveResultByID.TE.' + LiveReportDataID + '.txt', function (res) {
                    var aJson = eval('(' + res + ')');
                    me.ScheduleDetailData.ScheduleDetailList = aJson.Message.Row;
                    me.DetailDisplay();
                }); 
            });                       
        }
        catch (cer) { ; }
    }

    this.DetailDisplay = function () {
        var me = App.Modules.Schedule;
        try {
            cs_getTpl('app/Tpls/tplScheduleDetail.htm', function (sTplContent) {
                var sHtml = bt(sTplContent, { tplData: me.ScheduleDetailData });
                $('#ScheduleDetailShow').empty();
                $('#ScheduleDetailShow').html(sHtml);
                $.mobile.changePage('#ScheduleDetail');
                $('#ScheduleDetailShow').trigger('create');
            });
        }
        catch (cer) { ; }
    }
}

TESchedule.prototype.ScheduleData = new TEScheduleData();
TESchedule.prototype.ScheduleDetailData = new TEScheduleDetailData();
TApp.prototype.Modules.Schedule = new  TESchedule();

