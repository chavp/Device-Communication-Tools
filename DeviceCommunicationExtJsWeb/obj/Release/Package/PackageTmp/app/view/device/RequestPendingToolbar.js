﻿Ext.define('DeviceCommunication.view.device.RequestPendingToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.requestpendingtoolbar',
    dock: 'top',
    items: [
        { xtype: 'button', text: 'Cancle', action:'act-cancle-requestpending' }
    ]
});