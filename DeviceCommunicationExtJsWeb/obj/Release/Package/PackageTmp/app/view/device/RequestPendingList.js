﻿Ext.define('DeviceCommunication.view.device.RequestPendingList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.requestpendinglist',

    title: 'Request Config & Command Pending',
    store: 'RequestAckCommandStore',
    loadMask: false,
    columnLines: true,
    tbar: { xtype: 'requestpendingtoolbar' },

    initComponent: function () {
       

        this.columns = [
            { dataIndex: 'PushRequestTime', text: 'Push TCP REQ Time', width: 200, sortable: false },
            { dataIndex: 'RequestId', text: 'REQ ID', width: 200, sortable: false },
            { dataIndex: 'Imei', text: 'IMEI', width: 200, sortable: false },
            { dataIndex: 'ResponseMessageType', text: 'RESP MSG Type', width: 200, sortable: false }
        ];

        this.callParent(arguments);
    }
});