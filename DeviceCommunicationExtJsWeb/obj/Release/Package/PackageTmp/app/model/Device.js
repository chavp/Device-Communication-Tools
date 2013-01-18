Ext.define('DeviceCommunication.model.Device', {
    extend: 'Ext.data.Model',
    fields: ['Imei', 'IP', 'Firmware',
            { name: 'LatestAccessTime', type: 'date', dateFormat: 'MS' },
            { name: 'CountMessages', type: 'int' },
            { name: 'VehicleState' },
            { name: 'Silent1State' },
            { name: 'ObdBlackoutState' },
            { name: 'MismatchVinState' },
            { name: 'ModeState' },
            { name: 'TcpHangingState' }
        ],
    idProperty: 'Imei'
});