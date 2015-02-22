/// <reference path="../../sdk/jqmsdk/jquery-1.7.1.min.js" />
/// <reference path="../../sdk/jqmsdk/jquery.mobile-1.3.1.min.js" />
/// <reference path="../app.js" />
/// <reference path="../common.js" />
/// <reference path="../../sdk/plugIn/baiduTpls.js" />

function TEMedalData() {
    this.TotalMedalList = [];
    this.TEMedalList = [];
}

function TEMedalByDelegationData() {
    this.DelegationID = 0;
    this.MedalByDelegationList = [];
    this.RankDetailByDelegationList = [];
    this.RankDetailScoreByDelegationList = [];
}
function TEMedal() {
    this.Load = function () {
        var me = App.Modules.Medal;
        try {
            me.Refresh();
        }
        catch (cer) { ; }
    }

    this.Refresh = function () {
        var me = App.Modules.Medal;
        try {
            cs_getData('MedalItemByDisciplineGame_New/MedalItemByDisciplineGame_New.TE.txt', function (res) {
                var aJson = eval('(' + res + ')');
                me.MedalData.TEMedalList = aJson.Message.Row;
                cs_getData('MedalByTotal_New/MedalByTotal_New.txt', function (res) {
                    var aJson = eval('(' + res + ')');
                    me.MedalData.TotalMedalList = aJson.Message.Row;
                    me.Display();
                });
            });
        }
        catch (cer) { ; }
    }

    this.Display = function () {
        var me = App.Modules.Medal;
        try {
            cs_getTpl('app/Tpls/tplMedal.htm', function (sTplContent) {
                var sHtml = bt(sTplContent, { tplData: me.MedalData});
                $('#TE_Medal').empty();
                $('#TE_Medal').html(sHtml);
                $('#TE_Medal').trigger('create');
            });
        }
        catch (cer) { ; }
    }

    this.MedalByDelegationLoad = function (Delegation_ID) {
        var me = App.Modules.Medal;
        me.MedalByDelegationData.DelegationID = Delegation_ID;
        try {
            me.MedalByDelegationRefresh();
        }
        catch (cer) { ; }
    }

    this.MedalByDelegationRefresh = function () {
        var me = App.Modules.Medal;
        var Delegation_ID = me.MedalByDelegationData.DelegationID;
        try {
            cs_getData('MedalByDelegation/MedalByDelegation.' + Delegation_ID + '.txt', function (res) {
                var aJson = eval('(' + res + ')');
                me.MedalByDelegationData.MedalByDelegationList = aJson.Message.Row;
                cs_getData('RankDetailByDelegation/RankDetailByDelegation.' + Delegation_ID + '.txt', function (res) {
                    var aJson = eval('(' + res + ')');
                    me.MedalByDelegationData.RankDetailByDelegationList = aJson.Message.Row;
                    cs_getData('RankDetailScoreByDelegation/RankDetailScoreByDelegation.' + Delegation_ID + '.txt', function (res) {
                        var aJson = eval('(' + res + ')');
                        me.MedalByDelegationData.RankDetailScoreByDelegationList = aJson.Message.Row;
                        me.MedalByDelegationDisplay();
                    });
                });
            });
        }
        catch (cer) { ; }
    }

    this.MedalByDelegationDisplay = function () { 
        var me = App.Modules.Medal;
        try {
            cs_getTpl('app/Tpls/tplMedalByDelegation.htm', function (sTplContent) {
                var sHtml = bt(sTplContent, { tplData: me.MedalByDelegationData });
                $('#MedalByDelegationDetail').empty();
                $('#MedalByDelegationDetail').html(sHtml);
                $.mobile.changePage('#MedalByDelegation');
                $('#MedalByDelegationDetail').trigger('create');
            });
        }
        catch (cer) { ; }
    }
}

TEMedal.prototype.MedalData = new TEMedalData();
TEMedal.prototype.MedalByDelegationData = new TEMedalByDelegationData();
TApp.prototype.Modules.Medal = new TEMedal();