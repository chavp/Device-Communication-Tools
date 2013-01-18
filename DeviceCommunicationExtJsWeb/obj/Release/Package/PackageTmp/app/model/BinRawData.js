Ext.define('DeviceCommunication.model.BinRawData', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'Index', type: 'int' },
        { name: 'Data', type: 'int' },
        'Label', 'Name'
    ]
});