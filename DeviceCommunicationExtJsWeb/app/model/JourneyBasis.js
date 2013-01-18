Ext.define('DeviceCommunication.model.JourneyBasis', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'Version', type: 'int' },
        { name: 'JourneyId', type: 'int' },
        { name: 'StartJourney', type: 'date', dateFormat: 'MS' },
        { name: 'StopJourney', type: 'date', dateFormat: 'MS' },
        { name: 'HavDistanceFromGeopointsMeter', type: 'int' },
        { name: 'HavDistanceMeter', type: 'int' },
        { name: 'FullHavDistanceMeter', type: 'int' },
        { name: 'FullIntDistanceMeter', type: 'int' },
        { name: 'JneyDuration' },
        { name: 'DrivingDuration' },
        { name: 'IdlingDuration' },
        { name: 'DrValue' },
        { name: 'DrStandardDeviation' },
        { name: 'IsLoasStartJney', type: 'boolean' },
        { name: 'Profile', type: 'int' },
        'Imei', 'JourneyStartId', 'JourneySummaryId'
    ]
});