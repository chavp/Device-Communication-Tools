Ext.define('DeviceCommunication.store.DeviceStore', {
    extend: 'Ext.data.Store',
    alias: 'widget.devicestore',
    model: 'DeviceCommunication.model.Device',
    autoLoad: true,
    pageSize: 100,
    
    proxy: {
        type: 'ajax',
        api: {
            read: 'Devices/GellAllDevice'
        },
        timeout: 120000,
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total',
            successProperty: 'success'
        }
    }
});