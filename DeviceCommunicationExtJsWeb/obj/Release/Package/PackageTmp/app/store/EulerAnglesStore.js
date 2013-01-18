Ext.define('DeviceCommunication.store.EulerAnglesStore', {
    extend: 'Ext.data.Store',
    alias: 'widget.euleranglesstore',
    model: 'DeviceCommunication.model.EulerAngles',
    autoLoad: true,
    sorters: [{ property: 'Index'}],
    groupField: 'HeaderTime',
    pageSize: 10,
    proxy: {
        type: 'ajax',
        //api: { read: getJourneyBasisAction },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total'
        }//end proxy
    }
});