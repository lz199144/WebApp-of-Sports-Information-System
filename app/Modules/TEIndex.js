/// <reference path="../../sdk/jqmsdk/jquery.mobile-1.1.1.js" />
/// <reference path="../../sdk/jqmsdk/jquery-1.7.1.min.js" />
/// <reference path="../app.js" />

function TEIndex() {
    this.OnTap = function () {
        $.mobile.changePage('#pageIntroduce');
    }
}

TApp.prototype.Modules.Index = new TEIndex();