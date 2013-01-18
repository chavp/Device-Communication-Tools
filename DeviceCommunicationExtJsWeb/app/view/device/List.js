﻿Ext.define('DeviceCommunication.view.device.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.devicelist',

    title: 'Devices in System',

    store: 'DeviceStore',

    //autoScroll: true,
    loadMask: false,
    columnLines: true,
    tbar: { xtype: 'devicetoolbar' },

    initComponent: function () {

        var onRenderer = function(value, metadata){
            if (value == "Yes") {
                metadata.style = "color:Red;";
            }else if (value == "No") {
                metadata.style = "color:Green;";
            }else if (value == "Driving") {
                metadata.style = "background-color:#fbb1f4;";
            }else if (value == "Parking") {
                metadata.style = "background-color:#b1fbcd;";
            }else if (value == "Towing") {
                metadata.style = "background-color:#eaf16f;";
            }
            return value;
        };

        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: 'DeviceStore',
            displayInfo: true,
            displayMsg: 'Displaying Device {0} - {1} of {2}',
            emptyMsg: "No devices to display"
        });

        this.columns = [
            { dataIndex: 'Imei', id: 'Imei', text: 'Device ID (IMEI)', width: 150, sortable: true },
            { dataIndex: 'DeviceSn', id: 'DeviceSn', text: 'Case# (DeviceSN)', width: 150, sortable: true },
            { dataIndex: 'Firmware', id: 'Firmware', text: 'Ver', width: 50, sortable: true },
            { dataIndex: 'Profile', id: 'Profile', text: 'Profile', width: 50, sortable: true },
            { dataIndex: 'IP', id: 'IP', text: 'Latest Access IP', width: 100, sortable: true },
            { dataIndex: 'LatestAccessTime', id: 'LatestAccessTime', text: 'Latest Access Time', width: 150, sortable: true, renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s') },
            { dataIndex: 'ServerID', id: 'ServerID', text: 'Server', width: 50, sortable: true },
            { dataIndex: 'CountMessages', id: 'CountMessages', text: '#Msg', width: 50, sortable: true },
            { dataIndex: 'VehicleState', text: 'Vehicle', width: 50, sortable: true, renderer:onRenderer },
            { dataIndex: 'Silent1State', text: 'Silent1', width: 50, sortable: true, renderer:onRenderer },
            { dataIndex: 'ObdBlackoutState', text: 'OBD Blackout', width: 80, sortable: true, renderer:onRenderer },
            { dataIndex: 'MismatchVinState', text: 'Mismatch', width: 70, sortable: true, renderer:onRenderer },
            { dataIndex: 'ModeState', text: 'Mode', width: 50, sortable: true },
            { dataIndex: 'TcpHangingState', text: 'TCP RESP Mode', width: 90, sortable: true},
            { dataIndex: 'ToDayCountMessages', id: 'ToDayCountMessages', text: 'ToDayCountMessages', width: 50, hidden: true  },
            { dataIndex: 'ToDayInvalidChecksum', id: 'ToDayInvalidChecksum', text: 'ToDayInvalidChecksum', width: 60, hidden: true  },
            { xtype: 'actioncolumn', width: 150, text: 'Actions',
                sortable: false,
                items: [
                    {
                        icon: window.ContentUrl + 'fatcow-hosting-icons-2000/32x32/car.png',
                        tooltip: 'Tracking',
                        handler: function (grid, rowIndex, colIndex) {
                            var rec = this.up().up().store.getAt(rowIndex);
                            var imei = rec.get('Imei');
                            var trackingAction = window.TrackingAction + '?imei=' + imei;
                            //console.log(trackingAction);
                            //var trackingAction = actTracking.replace('_imei', val);
                            window.open(trackingAction);
                        }
                    },
                    {
                        icon: window.ContentUrl + 'fatcow-hosting-icons-2000/32x32/bug_go.png',
                        tooltip: 'Logs (Bouth UDP and TCP data from device )',
                        handler: function (grid, rowIndex, colIndex) {
                            var rec = this.up().up().store.getAt(rowIndex);
                            var imei = rec.get('Imei');
                            //var actLogs = '@Url.Action("Logs", "Devices", new { imei = "_imei" })';
                            var logsAction = window.LogsAction + '?imei=' + imei;
                            window.open(logsAction);
                        }
                    },
                    {
                        icon: window.ContentUrl + 'fatcow-hosting-icons-2000/32x32/ladybird.png',
                        tooltip: 'Messages (order by HeaderTime and Seq)',
                        handler: function (grid, rowIndex, colIndex) {
                            var rec = this.up().up().store.getAt(rowIndex);
                            var imei = rec.get('Imei');
                            //var actMessages = '@Url.Action("Messages", "Devices", new { imei = "_imei" })';
                            var msgsAction = window.MessagesAction + '?imei=' + imei;
                            //var msgsAction = actMessages.replace('_imei', val);
                            window.open(msgsAction);
                        }
                    },
                    {
                        icon: window.ContentUrl + 'fatcow-hosting-icons-2000/32x32/events.png',
                        tooltip: 'Event Alert',
                        handler: function (grid, rowIndex, colIndex) {
                            var rec = this.up().up().store.getAt(rowIndex);
                            var imei = rec.get('Imei');
                            //var actMessages = '@Url.Action("Messages", "Devices", new { imei = "_imei" })';
                            var msgsAction = window.DeviceEventAlertAction + '?imei=' + imei;
                            //var msgsAction = actMessages.replace('_imei', val);
                            window.open(msgsAction);
                        }
                    }]
            }
        ];

        this.callParent(arguments);
    }
});