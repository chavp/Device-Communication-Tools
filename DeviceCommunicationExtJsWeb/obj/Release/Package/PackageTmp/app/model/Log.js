Ext.define('DeviceCommunication.model.Log', {
    extend: 'Ext.data.Model'
            , fields: [
                { name: 'TimeGenerated', type: 'date', dateFormat: 'MS' },
                'MessageType',
                'Seq',
                'HeaderTime',
                'AckCompleted',
                'WriteResponseElapsed',
                'ServerId',
                'ServerTime',
                'ResponseSeq',
                'StatusCode',
                'RequestId',
                'RequestCommand',
                'ResponseMsgType',
                'TimesOfRequstCommand',
                'DeviceAddress',
                'Encryption',
                'ErrorMessage',
                'PacketId']
});