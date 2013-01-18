Ext.define('DeviceCommunication.model.EulerAngles', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'Index', type: 'int' },
        { name: 'Seq', type: 'int' },
        { name: 'SubSeq', type: 'int' },
        { name: 'HeaderTime', type: 'date', dateFormat: 'MS' },
        { name: 'HeaderTimeUct', type: 'date', dateFormat: 'MS' },

        { name: 'EPsi', type: 'float' },
        { name: 'ETheta', type: 'float' },
        { name: 'EPhi', type: 'float' },

        { name: 'MPsi', type: 'float' },
        { name: 'MTheta', type: 'float' },
        { name: 'MPhi', type: 'float' },

        { name: 'TPsi', type: 'float' },
        { name: 'TTheta', type: 'float' },
        { name: 'TPhi', type: 'float' }
    ]
});