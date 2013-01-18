﻿Ext.Loader.setConfig({ enabled: true });

Ext.require('Ext.chart.*');
Ext.require(['Ext.Window', 'Ext.layout.container.Fit', 'Ext.fx.target.Sprite']);

Ext.QuickTips.init();

Ext.application({
    name: 'DeviceCommunication',
    appFolder: 'app',
    controllers: ['DeviceCommunicationController'],
    launch: function () {
        //console.log("app -> launch");

        Ext.create('Ext.container.Viewport', {
            layout: {type: 'border', padding: 5 },
            defaults: {split: true, frame: false},
            items: [{ 
                xtype: 'tabpanel', 
                region: 'center', 
                items: [
                    {xtype: 'devicelist', iconCls: 'icon-tabs'},
                    {xtype: 'requestpendinglist', iconCls: 'icon-tabs'}
                ]
            }]
        });
    }
});