Ext.define('DeviceCommunication.model.JourneySummary', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'CreateDate', type: 'date', dateFormat: 'MS' },
        { name: 'Seq', type: 'int' },
        { name: 'JourneyId', type: 'int' },
        { name: 'DrValue' },
        { name: 'DrStandardDeviation' }
    ]
});