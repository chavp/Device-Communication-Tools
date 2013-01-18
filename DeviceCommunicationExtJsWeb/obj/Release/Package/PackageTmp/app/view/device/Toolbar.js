﻿Ext.define('DeviceCommunication.view.device.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.devicetoolbar',
    dock: 'top',
    items: [
        { xtype: 'button', text: 'GPS First Fix', action:'act-gps-first-fix', iconCls: 'icon-chart' },
        { xtype: 'button', text: 'Euler Angles', action:'act-euler-angles', iconCls: 'icon-details' },
        { xtype: 'button', text: 'Journey Basis', action:'act-journey-basis', iconCls: 'icon-grid' },
        { xtype: 'button', text: 'Dr Value', action:'act-journey-summary', iconCls: 'icon-chart' },
        { xtype: 'button', text: 'Daily Basis', action:'act-daily-basis', iconCls: 'icon-details' }
    ]
});