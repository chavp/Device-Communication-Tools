Ext.define('DeviceCommunication.model.DeviceEventAlert', {
    extend: 'Ext.data.Model'
        , fields: [
            'Id',
            { name: 'CreateDate', type: 'date', dateFormat: 'MS' },
            { name: 'HeaderTimeUtc', type: 'date', dateFormat: 'MS' },
            'Imei',
            'DeviceSn',
            'Destination',
            'Source',
            { name: 'Seq', type: 'int' },
            'PacketId',
            'MessageType',
            'EventType',
            'Description'
        ]
});