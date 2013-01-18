Ext.define('DeviceCommunication.model.DailyBasis', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'Imei' },
        { name: 'ForDate', type: 'date', dateFormat: 'MS' },
        { name: 'HavDistanceFromGeopointsMeter', type: 'int' },
        { name: 'TotalOfGeopoint', type: 'int' },
        { name: 'MeterPerGeopoint', type: 'int' },
        { name: 'TotalNear', type: 'int' },
        { name: 'MaxTotalNear', type: 'int' },
        { name: 'Version' }
    ]
});