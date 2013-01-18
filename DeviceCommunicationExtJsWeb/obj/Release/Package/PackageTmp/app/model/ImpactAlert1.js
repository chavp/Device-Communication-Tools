Ext.define('DeviceCommunication.model.ImpactAlert1', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'HeaderTime', type: 'date', dateFormat: 'MS' },
        { name: 'Seq' },

        { name: 'MsgId' },
        { name: 'TotalMsg' },
        { name: 'MsgNumber' },

        { name: 'ImpactUniqueID' },
        { name: 'ArrayType' },
        { name: 'NumberOfDataPointInArray' },
        { name: 'Index' },
        { name: 'ValueOfXAxisAcceleration' },
        { name: 'ValueOfYAxisAcceleration' },
        { name: 'ValueOfZAxisAcceleration' }
    ]
});