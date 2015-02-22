/// <reference path="../../sdk/jqmsdk/jquery-1.7.1.min.js" />
/// <reference path="../../sdk/jqmsdk/jquery.mobile-1.3.1.js" />
/// <reference path="../app.js" />
/// <reference path="../common.js" />
/// <reference path="../../sdk/plugIn/baiduTpls.js" />

function TEDelegationData() {
    this.DelegationList = [];
}

function TEMemberData() {
    this.MemberID = 0;
    this.Athlete = [];
    this.AthleteReg = [];
    this.AthleteResult = [];
    this.AthleteDiscipline = "";
    this.AthletePhoto = "";
    this.DisciplinePhoto = "";
}

function SearchMemberData() {
    this.MemberName = "";
    this.MemberList = [];
}

function TEDelegation() {
    this.Load = function () {
        var me = App.Modules.Delegation;
        try {
            me.Refresh();
        }
        catch (cer) { ; }
    }

    this.Refresh = function () {
        var me = App.Modules.Delegation;
        try {
            cs_getData('AthleteByDiscipline/AthleteByDiscipline.33.txt', function (res) {
                //alert(res.length);
                var aJson = eval('(' + res + ')');
                me.DelegationData.DelegationList = aJson.Message.Row[0].Row1;
                me.Display();
            });
        }
        catch (cer) { ; }
    }

    this.Display = function () {
        var me = App.Modules.Delegation;
        try {
            cs_getTpl('app/Tpls/tplDelegation.htm', function (sTplContent) {
                var sHtml = bt(sTplContent, { tplData: me.DelegationData.DelegationList });
                $('#lstAthleteByDelegation').empty();
                $('#lstAthleteByDelegation').html(sHtml);
                $('#lstAthleteByDelegation').trigger('create');
            });
        }
        catch (cer) { ; }
    }

    this.MemberLoad = function (PersonID) {
        var me = App.Modules.Delegation;
        me.MemberData.MemberID = PersonID;
        try {
            me.MemberRefresh();            
        }
        catch (cer) { ; }
    }

    this.MemberRefresh = function () {
        var me = App.Modules.Delegation;
        var PersonID = me.MemberData.MemberID;
        try {
            
            cs_getData('Athlete/Athlete.' + PersonID + '.txt', function (res) {
                var aJson = eval('(' + res + ')');
                me.MemberData.Athlete = aJson.Message.Row[0];
                cs_getData('AthleteReg/AthleteReg.' + PersonID + '.txt', function (res) {
                    var aJson = eval('(' + res + ')');
                    me.MemberData.AthleteReg = aJson.Message.Row[0].Row1;
                    me.MemberData.AthleteDiscipline = aJson.Message.Row[0].BASE1_DisciplineLongName;
                    me.MemberData.AthletePhoto = 'http://results.liaoning2013.com.cn/Info2013/Data/Photo/Athlete/' + aJson.Message.Row[0].BASE1_DisciplineCode + '/' + PersonID + '.jpg';
                    me.MemberData.DisciplinePhoto = 'http://results.liaoning2013.com.cn/Info2013/images/sport_rb/spbutt_100x' + aJson.Message.Row[0].BASE1_DisciplineCode + '.gif';
                    cs_getData('AthleteResult/AthleteResult.' + PersonID + '.txt', function (res) {
                        var aJson = eval('(' + res + ')');
                        me.MemberData.AthleteResult = aJson.Message.Row[0].Row1;
                        me.MemberDisplay();
                    });
                });
            });
        }
        catch (cer) { ; }
    }

    this.MemberDisplay = function () {
        var me = App.Modules.Delegation;
        try {
            cs_getTpl('app/Tpls/tplMember.htm', function (sTplContent) {
                var sHtml = bt(sTplContent, { tplData: me.MemberData });
                $('#MemberDetail').empty();
                $('#MemberDetail').html(sHtml);
                $.mobile.changePage('#Member');
                $('#MemberDetail').trigger('create');
            });
        }
        catch (cer) { ; }
    }

    this.SearchMember = function (PersonName) {
        var me = App.Modules.Delegation;
        if (PersonName.length == 0) {
            $('#ShowSearchMember').empty();
            $('#ShowSearchMember').trigger('create');
        }
        else if (PersonName != me.SearchMemberData.MemberName) {
            try {
                me.SearchMemberData.MemberName = PersonName;
                cs_getData('AthleteSearch/AthleteSearch.' + PersonName + '.txt', function (res) {
                    var aJson = eval('(' + res + ')');
                    me.SearchMemberData.MemberList = aJson.Message.Row;
                    me.SearchMemberShow();
                });
            }
            catch (cer) { ; }
        }        
    }

    this.SearchMemberShow = function () {

        var me = App.Modules.Delegation;
        try {
            cs_getTpl('app/Tpls/tplSearchMember.htm', function (sTplContent) {
                var sHtml = bt(sTplContent, { tplData: me.SearchMemberData.MemberList });
                $('#ShowSearchMember').empty();
                $('#ShowSearchMember').html(sHtml);
                $('#ShowSearchMember').trigger('create');
            });
        }
        catch (cer) { ; }
    }
}

TEDelegation.prototype.DelegationData = new TEDelegationData();
TEDelegation.prototype.MemberData = new TEMemberData();
TEDelegation.prototype.SearchMemberData = new SearchMemberData();
TApp.prototype.Modules.Delegation = new TEDelegation();