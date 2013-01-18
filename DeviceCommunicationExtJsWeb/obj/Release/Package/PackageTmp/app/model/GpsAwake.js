Ext.define('DeviceCommunication.model.GpsAwake', {
    extend: 'Ext.data.Model',
    fields: ['SvId', 'SvC_No', 'SvElevation', 'SvAzimuth', 'SvC_No_Threshold'],
    idProperty: 'SvId'
});