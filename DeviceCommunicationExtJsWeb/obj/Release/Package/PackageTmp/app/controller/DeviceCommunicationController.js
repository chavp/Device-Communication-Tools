﻿Ext.define('DeviceCommunication.controller.DeviceCommunicationController', {
    extend: 'Ext.app.Controller',

    views:[
        'device.List', 
        'device.Toolbar', 
        'device.GpsFirstFixBarChartWindow', 
        'device.EulerAnglesWindow',
        'device.JourneyBasisWindow',
        'device.DailyBasisWindow',
        'device.RequestPendingList',
        'device.RequestPendingToolbar',
        'device.JourneySummaryWindow'
    ],

    stores:['DeviceStore', 'GpsFirstFixStore', 'RequestAckCommandStore', 'JourneySummaryStore'],

    models:['Device', 
        'GpsFirstFix', 
        'EulerAngles', 
        'JourneyBasis', 
        'Message', 
        'MessageCode', 
        'ImpactAlert1', 
        'ImpactAlert2', 
        'GpsAwake', 
        'RequestAckCommand',
        'DailyBasis',
        'JourneySummary'],

    init: function () {
        //console.log("DeviceCommunicationController -> init");
        this.control({
            'devicetoolbar button[action="act-gps-first-fix"]' : {
                click : this.actGpsFirstFix
             },
             'devicetoolbar button[action="act-euler-angles"]' : {
                click : this.actEulerAngles
             },
             'devicetoolbar button[action="act-journey-basis"]' : {
                click : this.actJourneyBasis
             },
             'devicetoolbar button[action="act-bypass"]' : {
                click : this.actBypass
             },
             'devicetoolbar button[action="act-daily-basis"]' : {
                click : this.actDailyBasis
             },
             'devicetoolbar button[action="act-journey-summary"]' : {
                click : this.actJourneySummary
             }
        });
    },

    actGpsFirstFix: function(btn,evt){
        var gridDevice = btn.up().up();
        var selected = gridDevice.getSelectionModel().getLastSelected();

        if (selected) {
            var imei = selected.get('Imei');

            var chartWindow = Ext.widget('gpsfirstfixbarchartwindow', {animateTarget: btn.getEl()});
            chartWindow.setTitle("GPS-First Fix -> IMEI:[" + imei + "]");
            var store = Ext.widget('gpsfirstfixstore');
            store.getProxy().extraParams.imei = imei;
            chartWindow.doRefreshData(store);
            chartWindow.show();
        }
    },
    actEulerAngles: function(btn,evt){
        var gridDevice = btn.up().up();
        var selected = gridDevice.getSelectionModel().getLastSelected();

        if (selected) {
            var imei = selected.get('Imei');

            var window = Ext.widget('eulerangleswindow', {animateTarget: btn.getEl()});
            window.setTitle("Euler Angles -> IMEI:[" + imei + "]");
            //var getEulerAnglesAction = window.BaseUrl + "Devices/GetEulerAngles?imei=" + imei;
            //console.log(getEulerAnglesAction);
            window.doRefreshData(imei);
            window.show();
        }
    },
    actJourneyBasis: function(btn,evt){
        var gridDevice = btn.up().up();
        var selected = gridDevice.getSelectionModel().getLastSelected();

        if (selected) {
            var imei = selected.get('Imei');

            var window = Ext.widget('journeybasiswindow', {animateTarget: btn.getEl()});
            window.setTitle("Journey Basis -> IMEI:[" + imei + "]");
            //var getEulerAnglesAction = window.BaseUrl + "Devices/GetEulerAngles?imei=" + imei;
            //console.log(getEulerAnglesAction);
            window.doRefreshData(imei);
            window.show();
        }
    },
    actDailyBasis: function(btn,evt){
        var gridDevice = btn.up().up();
        var selected = gridDevice.getSelectionModel().getLastSelected();

        if (selected) {
            var imei = selected.get('Imei');

            var window = Ext.widget('dailybasiswindow', {animateTarget: btn.getEl()});
            window.setTitle("Daily Basis -> IMEI:[" + imei + "]");
            //var getEulerAnglesAction = window.BaseUrl + "Devices/GetEulerAngles?imei=" + imei;
            //console.log(getEulerAnglesAction);
            window.doRefreshData(imei);
            window.show();
        }
    },

    actBypass: function(btn,evt){
        var gridDevice = btn.up().up();
        var selected = gridDevice.getSelectionModel().getLastSelected();

        if (selected) {
            var imei = selected.get('Imei');
            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to bypass device?',
                function (btnCon) {
                    if (btnCon === 'yes') {
                        $.ajax({
                            type: "POST",
                            cache: false,
                            data: "{'imei': '" + imei + "'}",
                            url: window.BypassAction,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result) {
                                if (result.success) {
                                    alert("Bypass Success.");
                                } else {
                                    alert("Error Bypass Device: " + result.message);
                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                alert(xhr.status + " " + thrownError);
                            }
                        });
                    }
                }
            );
        }
    },//end actBypass

    actJourneySummary: function(btn,evt){
        //alert("actJourneySummary");
        var gridDevice = btn.up().up();
        var selected = gridDevice.getSelectionModel().getLastSelected();
        
        if (selected) {
            var rowIndex = gridDevice.store.indexOf(selected);

            var imei = selected.get('Imei');

            var url = window.BaseUrl + "Devices/GetJourneySummary?imei=" + imei + "&start=0&limit=50";
            Ext.MessageBox.show({
                msg: 'Please wait. I am querying Journey Summary.', 
                width: 300
            });

            $.ajax({
                type: "POST",
                cache: false,
                //async: false,
                url: url,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    //console.log(Ext.encode(result.data));
                    Ext.MessageBox.hide();

                    var popup = Ext.widget('journeysummarywindow', {animateTarget: btn.getEl()});
                    popup.setTitle("Dr Value -> IMEI:[" + imei + "]");
                    popup.view(result.data);
                    popup.createColor(rowIndex);
                    popup.show();
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    Ext.MessageBox.hide();
                    alert(xhr.status + " " + thrownError);
                }
            });
        }
    }//end actBypass

});