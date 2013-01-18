Ext.define('DeviceCommunication.model.Message', {
    extend: 'Ext.data.Model',
    fields: ['Imei', 'MessageType', 'Seq', 'Version', 'JouneyId',
    { name: 'HeaderTime', type: 'date', dateFormat: 'MS' },
    { name: 'CreatedTime', type: 'date', dateFormat: 'MS' },
    'PacketId'],
    idProperty: 'PacketId'
});