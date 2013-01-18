Ext.define('DeviceCommunication.model.ImpactAlert2', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'HeaderTime', type: 'date', dateFormat: 'MS' },
        { name: 'Seq' },

        { name: 'MsgId' },
        { name: 'TotalMsg' },
        { name: 'MsgNumber' },

        { name: 'Index' },

        { name: 'ImpactUniqueID' },
        { name: 'ArrayType' },
        { name: 'NumberOfDataPointInArray' },

        { name: 'UniqueJouneyId' },
        { name: 'UtcTime', type: 'date', dateFormat: 'MS' },
        { name: 'Latitude', type: 'float' },
        { name: 'Longitude', type: 'float' },
        { name: 'LatitudePlot' },
        { name: 'LongitudePlot' },
        { name: 'Altitude' },
        { name: 'GroundSpeed' },
        { name: 'Heading' },
        { name: 'NumberOfSatellitesUsed' }
    ]
});