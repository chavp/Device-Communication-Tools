Ext.define('DeviceCommunication.model.RequestAckCommand', {
    extend: 'Ext.data.Model',
    fields: ['ServerId', 'PushRequestTime', 'RequestId', 'Imei', 'ResponseMessageType']
});