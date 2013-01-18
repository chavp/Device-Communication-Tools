Ext.define('DeviceCommunication.store.GpsFirstFixStore', {
    extend: 'Ext.data.Store',

    alias: 'widget.gpsfirstfixstore',
    model: 'DeviceCommunication.model.GpsFirstFix',
    autoLoad: false,
    
    proxy: {
        type: 'ajax',
        api: { read: window.BaseUrl + "Devices/GetGpsFirstFix" },
        reader: {type: 'json', root: 'data', totalProperty: 'total'}
    }
});