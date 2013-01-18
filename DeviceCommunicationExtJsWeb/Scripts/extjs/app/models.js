//defind Model
Ext.define('Device', {
    extend: 'Ext.data.Model',
    fields: ['Imei', 'IP', 'Firmware',
            { name: 'LatestAccessTime' },
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

Ext.define('Message', {
    extend: 'Ext.data.Model',
    fields: ['Imei', 'MessageType', 'Seq', 'Version', 'JouneyId', 'HeaderTime', 'CreatedTime', 'PacketId'],
    idProperty: 'PacketId'
});

Ext.define('RequestAckCommand', {
    extend: 'Ext.data.Model',
    fields: [
            'PushRequestTime', 'RequestId', 'Imei', 'ResponseMessageType'
        ]
});

Ext.define('Log', {
    extend: 'Ext.data.Model'
            , fields: [
                'Index',
                'TimeGenerated',
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

Ext.define('MessageCode', {
    extend: 'Ext.data.Model'
            , fields: ['Name', 'Value', 'Description']
});

Ext.define('ExampleData', {
    extend: 'Ext.data.Model',
    fields: ['Id', 'Name', 'Value']
});

Ext.define('AlgorithmConf', {
    extend: 'Ext.data.Model',
    fields: ['Imei', 'ConfRevision',
        'Description',
        'TAveraging',
        { name: 'Lamda1', type: 'float' },
        { name: 'Lamda2', type: 'float' },
        'ThresholdLow',
        'ThresholdHigh',
        'TStandstill',
        'TDriving',
        'TSleep',
        'TBraking',
        'ThresholdSpeed',
        'DeltaSpeed',
        'PhiThetaSize',
        'PsiSize',
        'DeltaVChangeThreshold',
        'DataDurationUsedFroDeltaVCompution',
        'ComputeDiscrepancyGpsMore',
        'GPSGroundSpeedToCalculateEulerAngles_km_h',
        'GPSGroundSpeedToReadObdCoreData_km_h',
        'RequestEulerAnglesCalculationEverySecond',
        'ComputeDiscrepancyGpsMore',
        'ReadAndStorePIDx31EverySecond',
        'ReadFuelGaugeTemperatureEverySecond',
        'FrequencyOfUploadMileageReportDuringJourney'
    ]
});

Ext.define('HistogramsConf', {
    extend: 'Ext.data.Model',
    fields: ['Imei', 'ConfRevision', 
        'Description',
        'HistogramCapture',
        'UploadWhenBinCountsReachThreshold',
        'UploadEveryDays'
    ]
});

Ext.define('TowingConf', {
    extend: 'Ext.data.Model',
    fields: [{name:'Imei'}, 'ConfRevision', 'Description',
        'TowingStatusConfigure',
        'TowingGroundSpeedThreshold'
    ]
});

Ext.define('GeoFenceConf', {
    extend: 'Ext.data.Model',
    fields: ['Imei', 'ConfRevision', 'Description',
        'GeoFenceId',
        'GeoFenceType',
        { name: 'GeoFenceLatitude', type: 'float' },
        { name: 'GeoFenceLongitude', type: 'float' },
        { name: 'GeoFenceLatitudeUpperRight', type: 'float' },
        { name: 'GeoFenceLongitudeUpperRight', type: 'float' },
        'GeoFenceRadius',
        'GeoFenceTriggerRule',
        'GeoFenceStatus'
    ]
});

Ext.define('VehicleBatteryConf', {
    extend: 'Ext.data.Model',
    fields: ['Imei', 'ConfRevision', 'Description',
        'TriggerVoltage1Upper',
        'TriggerVoltage1Lower',
        'TriggerVoltage2Upper',
        'TriggerVoltage2Lower',
        'MinimumTriggerDurationForTrigger1',
        'MinimumTriggerDurationForTrigger2',
        'TimeoutDurationForVehicleBatteryAlert'
    ]
});

Ext.define('FuelDropConf', {
    extend: 'Ext.data.Model',
    fields: ['Imei', 'ConfRevision', 'Description',
        'MinimumFuelDropForTriggerPercentage',
        'IntervalBetweenFuelReadingsSeconds'
    ]
});

Ext.define('IdlingConf', {
    extend: 'Ext.data.Model',
    fields: ['Imei', 'ConfRevision', 'Description',
        'StartIdlingObdThresholdSpeed',
        'StartIdlingGpsFallbackThresholdSpeed',
        'StartIdlingDurationThreshold',
        'StopIdlingObdRpmThreshold',
        'StopIdlingObdSpeedThreshold',
        'StopIdlingGpsSpeedThreshold'
    ]
});

Ext.define('EngineStartStopConf', {
    extend: 'Ext.data.Model',
    fields: ['Imei', 'ConfRevision', 'Description',
        'ObdRpmThresholdEndingOn',
        'ObdRpmThresholdEndingOff',
        'ObdIntervalReadingForTriggerSeconds'
    ]
});

Ext.define('Gps3DFixConf', {
    extend: 'Ext.data.Model',
    fields: ['Imei', 'ConfRevision', 'Description',
        'MinimumIntervalThresholdForTriggerSeconds'
    ]
});

Ext.define('JourneySummaryConf', {
    extend: 'Ext.data.Model',
    fields: ['Imei', 'ConfRevision', 'Description',
        'DrivingThresholdObdSpeed',
        'DrivingThresholdGpsSpeed',
        'DrivingThresholdRpm',
        'DrivingThresholdBatteryVoltage',
        'StandstillThresholdObdSpeed',
        'StandstillThresholdGpsSpeed',
        'StandstillThresholdRpm',
        'StandstillThresholdBatteryVoltage',
        'TowingThresholdDelta',
        'TowingThresholdGpsSpeed',
        'TowingThresholdRpm',
        'TowingThresholdBatteryVoltage'
    ]
});

Ext.define('AGpsConf', {
    extend: 'Ext.data.Model',
    fields: ['Imei', 'ConfRevision', 'Description',
        'CummulativeDurationOfNoFixBeforeRequestingAGps'
    ]
});

Ext.define('InternalBatteryConf', {
    extend: 'Ext.data.Model',
    fields: ['Imei', 'ConfRevision', 'Description',
        'FrequencyOfUpdateInternalBatterySoh',
        'MinimumBatteryChargeTrigger',
        'TargetBatteryCharge',
        'BatteryLevelToGoToSleep'
    ]
});

Ext.define('TiltAlertConf', {
    extend: 'Ext.data.Model',
    fields: ['Imei', 'ConfRevision', 'Description',
        'EnableDisableTiltAlert',
        'AngleDifferenceToTriggerTiltAlert'
    ]
});


Ext.define('GpsFirstFix', {
    extend: 'Ext.data.Model',
    fields: [{ name: 'Description' }, { name: 'TimeToFirstFix'}, 'Version']
});

Ext.define('JourneyBasis', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'JourneyId', type: 'int' },
        { name: 'StartJourney', type: 'date', dateFormat: 'MS' },
        { name: 'StopJourney', type: 'date', dateFormat: 'MS' },
        { name: 'HavDistanceFromGeopointsMeter', type: 'int' },
        { name: 'HavDistanceMeter', type: 'int' },
        { name: 'JneyDuration' },
        { name: 'DrivingDuration' },
        { name: 'IdlingDuration' }
    ]
});

Ext.define('EulerAngles', {
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

Ext.define('BinRawData', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'Index', type: 'int' },
        { name: 'Data', type: 'int' }
    ]
});