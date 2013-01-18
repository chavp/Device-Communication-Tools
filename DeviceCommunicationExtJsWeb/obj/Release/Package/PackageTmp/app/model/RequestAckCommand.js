Ext.define('DeviceCommunication.model.RequestAckCommand', {
    extend: 'Ext.data.Model',
    fields: ['PushRequestTime', 'RequestId', 'Imei', 'ResponseMessageType']
});