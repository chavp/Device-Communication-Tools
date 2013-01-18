Ext.define('DeviceCommunication.store.JourneySummaryStore', {
    extend: 'Ext.data.Store',

    alias: 'widget.journeysummarystore',
    model: 'DeviceCommunication.model.JourneySummary',
    autoLoad: false,

    pageSize: 50,

    proxy: {
        type: 'ajax',
        api: { read: window.BaseUrl + "Devices/GetJourneySummary" },
        reader: { type: 'json', root: 'data', totalProperty: 'total' }
    }
});