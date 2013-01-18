var onBackgroundColor = function () {
    var val = this.getValue();
    var fieldLabel = this.getFieldLabel();
    if (val == 'true') {
        this.setFieldStyle('background: #8ecf81;');
    } else {
        this.setFieldStyle('background: #ffa485;');
    }
    this.setValue(fieldLabel);
    //console.log(this.getValue());
}

Ext.define('DeviceCommunication.view.device.ObdWindow', {
    extend: 'Ext.Window',
    initComponent: function () {
        Ext.apply(this, {
            width: 500,
            height: 500,
            title: 'Standard PIDs',
            bodyPadding: 5,
            autoScroll: true,
            resizable: false,
            items: [{
                xtype: 'fieldset', title: 'PID Support 00', defaultType: 'textfield',
                layout: { type: 'column' },
                defaults: {
                    layout: 'anchor', labelWidth: 350, width: 400, readOnly: true,
                    margin: '3 3 3 3', columnWidth: 1, bodyStyle: 'padding:5px 0 5px 5px', hideLabel: true,
                    listeners: {render: onBackgroundColor}
                },
                items: [
                            {fieldLabel: "Monitor status since DTCs cleared", name: 'IsSupportMonitorStatusSinceDTCsCleared' }, //- 0
                            {fieldLabel: "Freeze DTC", name: 'IsSupportFreezeDTC' }, //- 1
                            {fieldLabel: "Fuel system status", name: 'IsSupportFuelSystemStatus' }, //- 2
                            {fieldLabel: "Calculated engine load value", name: 'IsSupportCalculatedEngineLoadValue' }, //- 3
                            {fieldLabel: "Engine coolant temperature", name: 'IsSupportEngineCoolantTemperature' }, //- 4
                            {fieldLabel: "Short term fuel % trim—Bank 1", name: 'IsSupportShortTermFuelPercentTrimBank1' }, //- 5
                            {fieldLabel: "Long term fuel % trim—Bank 1", name: 'IsSupportLongTermFuelPercentTrimBank1' }, //- 6
                            {fieldLabel: "Short term fuel % trim—Bank 2", name: 'IsSupportShortTermFuelPercentTrimBank2' }, //- 7
                            {fieldLabel: "Long term fuel % trim—Bank 2", name: 'IsSupportLongTermFuelPercentTrimBank2' }, //- 8
                            {fieldLabel: "Fuel pressure", name: 'IsSupportFuelPressure' }, //- 9
                            {fieldLabel: "Intake manifold absolute pressure", name: 'IsSupportIntakeManifoldAbsolutePressure' }, //- 10
                            {fieldLabel: "Engine RPM", name: 'IsSupportEngineRPM' }, //- 11
                            {fieldLabel: "Vehicle speed", name: 'IsSupportVehicleSpeed' }, //- 12
                            {fieldLabel: "Timing advance", name: 'IsSupportTimingAdvance' }, //- 13
                            {fieldLabel: "Intake air temperature", name: 'IsSupportIntakeAirTemperature' }, //- 14
                            {fieldLabel: "MAF air flow rate", name: 'IsSupportMAFAirFlowRate' }, //- 15
                            {fieldLabel: "Throttle position", name: 'IsSupportThrottlePosition' }, //- 16
                            {fieldLabel: "Commanded secondary air status", name: 'IsSupportCommandedSecondaryAirStatus' }, //- 17
                            {fieldLabel: "Oxygen sensors present", name: 'IsSupportOxygenSensorsPresent' }, //- 18
                            {fieldLabel: "Bank 1, Sensor 1: Oxygen sensor voltage, Short term fuel trim", name: 'IsSupportBank1Sensor1OxygenSensorVoltageShortTermFuelTrim' }, //- 19
                            {fieldLabel: "Bank 1, Sensor 2: Oxygen sensor voltage, Short term fuel trim", name: 'IsSupportBank1Sensor2OxygenSensorVoltageShortTermFuelTrim' }, //- 20
                            {fieldLabel: "Bank 1, Sensor 3: Oxygen sensor voltage, Short term fuel trim", name: 'IsSupportBank1Sensor3OxygenSensorVoltageShortTermFuelTrim' }, //- 21
                            {fieldLabel: "Bank 1, Sensor 4: Oxygen sensor voltage, Short term fuel trim", name: 'IsSupportBank1Sensor4OxygenSensorVoltageShortTermFuelTrim' }, //- 22
                            {fieldLabel: "Bank 2, Sensor 1: Oxygen sensor voltage, Short term fuel trim", name: 'IsSupportBank2Sensor1OxygenSensorVoltageShortTermFuelTrim' }, //- 23
                            {fieldLabel: "Bank 2, Sensor 2: Oxygen sensor voltage, Short term fuel trim", name: 'IsSupportBank2Sensor2OxygenSensorVoltageShortTermFuelTrim' }, //- 24
                            {fieldLabel: "Bank 2, Sensor 3: Oxygen sensor voltage, Short term fuel trim", name: 'IsSupportBank2Sensor3OxygenSensorVoltageShortTermFuelTrim' }, //- 25
                            {fieldLabel: "Bank 2, Sensor 4: Oxygen sensor voltage, Short term fuel trim", name: 'IsSupportBank2Sensor4OxygenSensorVoltageShortTermFuelTrim' }, //- 26
                            {fieldLabel: "OBD standards this vehicle conforms to", name: 'IsSupportOBDStandardsThisVehicleConformsTo' }, //- 27
                            {fieldLabel: "Oxygen sensors present (Similar to PID 13)", name: 'IsSupportOxygenSensorsPresentSimilarToPID13' }, //- 28
                            {fieldLabel: "Auxiliary input status", name: 'IsSupportAuxiliaryInputStatus' }, //- 29
                            {fieldLabel: "Run time since engine start", name: 'IsSupportRunTimeSinceEngineStart' }, //- 30
                            {fieldLabel: "Blank", name: 'IsSupportPIDs01', hidden: true} //- 31
                        ]
            }, {
                xtype: 'fieldset', title: 'PID Support 20', defaultType: 'textfield',
                layout: { type: 'column' },
                defaults: {
                    layout: 'anchor', labelWidth: 350, width: 400, readOnly: true,
                    margin: '3 3 3 3', columnWidth: 1, bodyStyle: 'padding:5px 0 5px 5px', hideLabel: true,
                    listeners: { render: onBackgroundColor }
                },
                items: [
                    {fieldLabel: "Distance traveled with malfunction indicator lamp (MIL) on", name: 'IsSupportDistanceTraveledWithMalfunctionIndicatorLampMILOn' }, // -0
                    {fieldLabel: "Fuel Rail Pressure (relative to manifold vacuum)", name: 'IsSupportFuelRailPressureRelativeToManifoldVacuum' }, // -1
                    {fieldLabel: "Fuel Rail Pressure (diesel, or gasoline direct inject)", name: 'IsSupportFuelRailPressureDieselOrGasolineDirectInject' }, // -2
                    {fieldLabel: "O2S1_WR_lambda(1): Equivalence Ratio Voltage", name: 'IsSupportO2S1_WR_lambda1EquivalenceRatioVoltage' }, // -3
                    {fieldLabel: "O2S2_WR_lambda(1): Equivalence Ratio Voltage", name: 'IsSupportO2S2_WR_lambda1EquivalenceRatioVoltage' }, // -4
                    {fieldLabel: "O2S3_WR_lambda(1): Equivalence Ratio Voltage", name: 'IsSupportO2S3_WR_lambda1EquivalenceRatioVoltage' }, // -5
                    {fieldLabel: "O2S4_WR_lambda(1): Equivalence Ratio Voltage", name: 'IsSupportO2S4_WR_lambda1EquivalenceRatioVoltage' }, // -6
                    {fieldLabel: "O2S5_WR_lambda(1): Equivalence Ratio Voltage", name: 'IsSupportO2S5_WR_lambda1EquivalenceRatioVoltage' }, // -7
                    {fieldLabel: "O2S6_WR_lambda(1): Equivalence Ratio Voltage", name: 'IsSupportO2S6_WR_lambda1EquivalenceRatioVoltage' }, // -8
                    {fieldLabel: "O2S7_WR_lambda(1): Equivalence Ratio Voltage", name: 'IsSupportO2S7_WR_lambda1EquivalenceRatioVoltage' }, // -9
                    {fieldLabel: "O2S8_WR_lambda(1): Equivalence Ratio Voltage", name: 'IsSupportO2S8_WR_lambda1EquivalenceRatioVoltage' }, // -10
                    {fieldLabel: "Commanded EGR", name: 'IsSupportCommandedEGR' }, // -11
                    {fieldLabel: "EGR Error", name: 'IsSupportEGRError1' }, // -12
                    {fieldLabel: "Commanded evaporative purge", name: 'IsSupportCommandedEvaporativePurge' }, // -13
                    {fieldLabel: "Fuel Level Input", name: 'IsSupportFuelLevelInput' }, // -14
                    {fieldLabel: "# of warm-ups since codes cleared", name: 'IsSupportNumberOfWarmUpsSinceCodesCleared' }, // -15
                    {fieldLabel: "Distance traveled since codes cleared", name: 'IsSupportDistanceTraveledSinceCodesCleared' }, // -16
                    {fieldLabel: "Evap. System Vapor Pressure", name: 'IsSupportEvapSystemVaporPressure' }, // -17
                    {fieldLabel: "Barometric pressure", name: 'IsSupportBarometricPressure' }, // -18
                    {fieldLabel: "O2S1_WR_lambda(1): Equivalence Ratio Current", name: 'IsSupportO2S1_WR_lambda1EquivalenceRatioCurrent' }, // -19
                    {fieldLabel: "O2S2_WR_lambda(1): Equivalence Ratio Current", name: 'IsSupportO2S2_WR_lambda1EquivalenceRatioCurrent' }, // -20
                    {fieldLabel: "O2S3_WR_lambda(1): Equivalence Ratio Current", name: 'IsSupportO2S3_WR_lambda1EquivalenceRatioCurrent' }, // -21
                    {fieldLabel: "O2S4_WR_lambda(1): Equivalence Ratio Current", name: 'IsSupportO2S4_WR_lambda1EquivalenceRatioCurrent' }, // -22
                    {fieldLabel: "O2S5_WR_lambda(1): Equivalence Ratio Current", name: 'IsSupportO2S5_WR_lambda1EquivalenceRatioCurrent' }, // -23
                    {fieldLabel: "O2S6_WR_lambda(1): Equivalence Ratio Current", name: 'IsSupportO2S6_WR_lambda1EquivalenceRatioCurrent' }, // -24
                    {fieldLabel: "O2S7_WR_lambda(1): Equivalence Ratio Current", name: 'IsSupportO2S7_WR_lambda1EquivalenceRatioCurrent' }, // -25
                    {fieldLabel: "O2S8_WR_lambda(1): Equivalence Ratio Current", name: 'IsSupportO2S8_WR_lambda1EquivalenceRatioCurrent' }, // -26
                    {fieldLabel: "Catalyst Temperature Bank 1, Sensor 1", name: 'IsSupportCatalystTemperatureBank1Sensor1' }, // -27
                    {fieldLabel: "Catalyst Temperature Bank 2, Sensor 1", name: 'IsSupportCatalystTemperatureBank2Sensor1' }, // -28
                    {fieldLabel: "Catalyst Temperature Bank 1, Sensor 2", name: 'IsSupportCatalystTemperatureBank1Sensor2' }, // -29
                    {fieldLabel: "Catalyst Temperature Bank 2, Sensor 2", name: 'IsSupportCatalystTemperatureBank2Sensor2' }, // -30
                    {fieldLabel: "Blank", name: 'IsSupportPIDs21', hidden: true} // -31
                ]
            }, {
                xtype: 'fieldset', title: 'PID Support 40', defaultType: 'textfield',
                layout: { type: 'column' },
                defaults: {
                    layout: 'anchor', labelWidth: 350, width: 400, readOnly: true,
                    margin: '3 3 3 3', columnWidth: 1, bodyStyle: 'padding:5px 0 5px 5px', hideLabel: true,
                    listeners: { render: onBackgroundColor }
                },
                items: [
                    {fieldLabel: "Monitor status this drive cycle", name: 'IsSupportMonitorStatusThisDriveCycle' }, // -0
                    {fieldLabel: "Control module voltage", name: 'IsSupportFuelRailPressureRelativeToManifoldVacuum' }, // -1
                    {fieldLabel: "Absolute load value", name: 'IsSupportAbsoluteLoadValue' }, // -2
                    {fieldLabel: "Command equivalence ratio", name: 'IsSupportCommandEquivalenceRatio' }, // -3
                    {fieldLabel: "Relative throttle position", name: 'IsSupportRelativeThrottlePosition' }, // -4
                    {fieldLabel: "Ambient air temperature", name: 'IsSupportAmbientAirTemperature' }, // -5
                    {fieldLabel: "Absolute throttle position B", name: 'IsSupportAbsoluteThrottlePositionB' }, // -6
                    {fieldLabel: "Absolute throttle position C", name: 'IsSupportAbsoluteThrottlePositionC' }, // -7
                    {fieldLabel: "Accelerator pedal position D", name: 'IsSupportAcceleratorPedalPositionD' }, // -8
                    {fieldLabel: "Accelerator pedal position E", name: 'IsSupportAcceleratorPedalPositionE' }, // -9
                    {fieldLabel: "Accelerator pedal position F", name: 'IsSupportAcceleratorPedalPositionF' }, // -10
                    {fieldLabel: "Commanded throttle actuator", name: 'IsSupportCommandedThrottleActuator' }, // -11
                    {fieldLabel: "Time run with MIL on", name: 'IsSupportTimeRunWithMILOn' }, // -12
                    {fieldLabel: "Time since trouble codes cleared", name: 'IsSupportTimeSinceTroubleCodesCleared' }, // -13
                    {fieldLabel: "Fuel Level Input", name: 'IsSupportFuelLevelInput' }, // -14
                    {fieldLabel: "Maximum value for equivalence ratio, oxygen sensor voltage, oxygen sensor current, and intake manifold absolute pressure", name: 'IsSupportMaximumValueForEquivalenceRatioOxygenSensorVoltageOxygenSensorCurrentAndIntakeManifoldAbsolutePressure' }, // -15
                    {fieldLabel: "Maximum value for air flow rate from mass air flow sensor", name: 'IsSupportMaximumValueForAirFlowRateFromMassAirFlowSensor' }, // -16
                    {fieldLabel: "Fuel Type", name: 'IsSupportFuelType' }, // -17
                    {fieldLabel: "Ethanol fuel %", name: 'IsSupportEthanolFuel' }, // -18
                    {fieldLabel: "Absolute Evap system Vapour Pressure", name: 'IsSupportAbsoluteEvapSystemVapourPressure' }, // -19
                    {fieldLabel: "Evap system vapor pressure", name: 'IsSupportEvapsystemvaporPressure' }, // -20
                    {fieldLabel: "Short term secondary oxygen sensor trim bank 1 and bank 3", name: 'IsSupportShortTermSecondaryOxygenSensorTrimBank1AndBank3' }, // -21
                    {fieldLabel: "Long term secondary oxygen sensor trim bank 1 and bank 3", name: 'IsSupportLongTermSecondaryOxygenSensorTrimBank1AndBank3' }, // -22
                    {fieldLabel: "Short term secondary oxygen sensor trim bank 2 and bank 4", name: 'IsSupportShortTermSecondaryOxygenSensorTrimBank2AndBank4' }, // -23
                    {fieldLabel: "Long term secondary oxygen sensor trim bank 2 and bank 4", name: 'IsSupportLongTermSecondaryOxygenSensorTrimBank2AndBank4' }, // -24
                    {fieldLabel: "Fuel rail pressure (absolute)", name: 'IsSupportFuelRailPressureAbsolute' }, // -25
                    {fieldLabel: "Relative accelerator pedal position", name: 'IsSupportRelativeAcceleratorPedalPosition' }, // -26
                    {fieldLabel: "Engine oil temperature", name: 'IsSupportEngineOilTemperature' }, // -27
                    {fieldLabel: "Fuel injection timing", name: 'IsSupportFuelInjectionTiming' }, // -28
                    {fieldLabel: "Engine fuel rate", name: 'IsSupportEngineFuelRate' }, // -29
                    {fieldLabel: "Emission requirements to which vehicle is designed", name: 'IsSupportEmissionRequirementsToWhichVehicleIsDesigned' }, // -30
                    {fieldLabel: "Blank", name: 'IsSupportPIDs41', hidden: true} // -31
                ]
            }
            ]
        });
        DeviceCommunication.view.device.ObdWindow.superclass.initComponent.apply(this, arguments);
    }
});

DeviceCommunication.view.device.ObdWindow.prototype.view = function (data) {
    //PIDs supported [01 - 20]
    this.items.get(0).items.get(0).setValue(data.IsSupportMonitorStatusSinceDTCsCleared);//-0
    this.items.get(0).items.get(1).setValue(data.IsSupportFreezeDTC);//-1
    this.items.get(0).items.get(2).setValue(data.IsSupportFuelSystemStatus);//-2
    this.items.get(0).items.get(3).setValue(data.IsSupportCalculatedEngineLoadValue);//-3
    this.items.get(0).items.get(4).setValue(data.IsSupportEngineCoolantTemperature);//-4
    this.items.get(0).items.get(5).setValue(data.IsSupportShortTermFuelPercentTrimBank1);//-5
    this.items.get(0).items.get(6).setValue(data.IsSupportLongTermFuelPercentTrimBank1);//-6
    this.items.get(0).items.get(7).setValue(data.IsSupportShortTermFuelPercentTrimBank2);//-7
    this.items.get(0).items.get(8).setValue(data.IsSupportLongTermFuelPercentTrimBank2);//-8
    this.items.get(0).items.get(9).setValue(data.IsSupportFuelPressure);//-9
    this.items.get(0).items.get(10).setValue(data.IsSupportIntakeManifoldAbsolutePressure);//-10
    this.items.get(0).items.get(11).setValue(data.IsSupportEngineRPM);//-11
    this.items.get(0).items.get(12).setValue(data.IsSupportVehicleSpeed);//-12
    this.items.get(0).items.get(13).setValue(data.IsSupportTimingAdvance);//-13
    this.items.get(0).items.get(14).setValue(data.IsSupportIntakeAirTemperature);//-14
    this.items.get(0).items.get(15).setValue(data.IsSupportMAFAirFlowRate);//-15
    this.items.get(0).items.get(16).setValue(data.IsSupportThrottlePosition);//-16
    this.items.get(0).items.get(17).setValue(data.IsSupportCommandedSecondaryAirStatus);//-17
    this.items.get(0).items.get(18).setValue(data.IsSupportOxygenSensorsPresent);//-18
    this.items.get(0).items.get(19).setValue(data.IsSupportBank1Sensor1OxygenSensorVoltageShortTermFuelTrim);//-19
    this.items.get(0).items.get(20).setValue(data.IsSupportBank1Sensor2OxygenSensorVoltageShortTermFuelTrim);//-20
    this.items.get(0).items.get(21).setValue(data.IsSupportBank1Sensor3OxygenSensorVoltageShortTermFuelTrim);//-21
    this.items.get(0).items.get(22).setValue(data.IsSupportBank1Sensor4OxygenSensorVoltageShortTermFuelTrim);//-22
    this.items.get(0).items.get(23).setValue(data.IsSupportBank2Sensor1OxygenSensorVoltageShortTermFuelTrim);//-23
    this.items.get(0).items.get(24).setValue(data.IsSupportBank2Sensor2OxygenSensorVoltageShortTermFuelTrim);//-24
    this.items.get(0).items.get(25).setValue(data.IsSupportBank2Sensor3OxygenSensorVoltageShortTermFuelTrim);//-25
    this.items.get(0).items.get(26).setValue(data.IsSupportBank2Sensor4OxygenSensorVoltageShortTermFuelTrim);//-26
    this.items.get(0).items.get(27).setValue(data.IsSupportOBDStandardsThisVehicleConformsTo);//-27
    this.items.get(0).items.get(28).setValue(data.IsSupportOxygenSensorsPresentSimilarToPID13);//-28
    this.items.get(0).items.get(29).setValue(data.IsSupportAuxiliaryInputStatus);//-29
    this.items.get(0).items.get(30).setValue(data.IsSupportRunTimeSinceEngineStart);//-30
    this.items.get(0).items.get(31).setValue(data.IsSupportPIDs01); //-31

    //Mode 1 PID 00 [21 - 40]
    this.items.get(1).items.get(0).setValue(data.IsSupportDistanceTraveledWithMalfunctionIndicatorLampMILOn); //-0
    this.items.get(1).items.get(1).setValue(data.IsSupportFuelRailPressureRelativeToManifoldVacuum); //-1
    this.items.get(1).items.get(2).setValue(data.IsSupportFuelRailPressureDieselOrGasolineDirectInject); //-2
    this.items.get(1).items.get(3).setValue(data.IsSupportO2S1_WR_lambda1EquivalenceRatioVoltage); //-3
    this.items.get(1).items.get(4).setValue(data.IsSupportO2S2_WR_lambda1EquivalenceRatioVoltage); //-4
    this.items.get(1).items.get(5).setValue(data.IsSupportO2S3_WR_lambda1EquivalenceRatioVoltage); //-5
    this.items.get(1).items.get(6).setValue(data.IsSupportO2S4_WR_lambda1EquivalenceRatioVoltage); //-6
    this.items.get(1).items.get(7).setValue(data.IsSupportO2S5_WR_lambda1EquivalenceRatioVoltage); //-7
    this.items.get(1).items.get(8).setValue(data.IsSupportO2S6_WR_lambda1EquivalenceRatioVoltage); //-8
    this.items.get(1).items.get(9).setValue(data.IsSupportO2S7_WR_lambda1EquivalenceRatioVoltage); //-9
    this.items.get(1).items.get(10).setValue(data.IsSupportO2S8_WR_lambda1EquivalenceRatioVoltage); //-10
    this.items.get(1).items.get(11).setValue(data.IsSupportCommandedEGR); //-11
    this.items.get(1).items.get(12).setValue(data.IsSupportEGRError1); //-12
    this.items.get(1).items.get(13).setValue(data.IsSupportCommandedEvaporativePurge); //-13
    this.items.get(1).items.get(14).setValue(data.IsSupportFuelLevelInput); //-14
    this.items.get(1).items.get(15).setValue(data.IsSupportNumberOfWarmUpsSinceCodesCleared); //-15
    this.items.get(1).items.get(16).setValue(data.IsSupportDistanceTraveledSinceCodesCleared); //-16
    this.items.get(1).items.get(17).setValue(data.IsSupportEvapSystemVaporPressure); //-17
    this.items.get(1).items.get(18).setValue(data.IsSupportBarometricPressure); //-18
    this.items.get(1).items.get(19).setValue(data.IsSupportO2S1_WR_lambda1EquivalenceRatioCurrent); //-19
    this.items.get(1).items.get(20).setValue(data.IsSupportO2S2_WR_lambda1EquivalenceRatioCurrent); //-20
    this.items.get(1).items.get(21).setValue(data.IsSupportO2S3_WR_lambda1EquivalenceRatioCurrent); //-21
    this.items.get(1).items.get(22).setValue(data.IsSupportO2S4_WR_lambda1EquivalenceRatioCurrent); //-22
    this.items.get(1).items.get(23).setValue(data.IsSupportO2S5_WR_lambda1EquivalenceRatioCurrent); //-23
    this.items.get(1).items.get(24).setValue(data.IsSupportO2S6_WR_lambda1EquivalenceRatioCurrent); //-24
    this.items.get(1).items.get(25).setValue(data.IsSupportO2S7_WR_lambda1EquivalenceRatioCurrent); //-25
    this.items.get(1).items.get(26).setValue(data.IsSupportO2S8_WR_lambda1EquivalenceRatioCurrent); //-26
    this.items.get(1).items.get(27).setValue(data.IsSupportCatalystTemperatureBank1Sensor1); //-27
    this.items.get(1).items.get(28).setValue(data.IsSupportCatalystTemperatureBank2Sensor1); //-28
    this.items.get(1).items.get(29).setValue(data.IsSupportCatalystTemperatureBank1Sensor2); //-29
    this.items.get(1).items.get(30).setValue(data.IsSupportCatalystTemperatureBank2Sensor2); //-30
    this.items.get(1).items.get(31).setValue(data.IsSupportPIDs21); //-31

    //Mode 1 PID 00 [41 - 60]
    this.items.get(2).items.get(0).setValue(data.IsSupportMonitorStatusThisDriveCycle); //-0
    this.items.get(2).items.get(1).setValue(data.IsSupportControlModuleVoltage); //-1
    this.items.get(2).items.get(2).setValue(data.IsSupportAbsoluteLoadValue); //-2
    this.items.get(2).items.get(3).setValue(data.IsSupportCommandEquivalenceRatio); //-3
    this.items.get(2).items.get(4).setValue(data.IsSupportRelativeThrottlePosition); //-4
    this.items.get(2).items.get(5).setValue(data.IsSupportAmbientAirTemperature); //-5
    this.items.get(2).items.get(6).setValue(data.IsSupportAbsoluteThrottlePositionB); //-6
    this.items.get(2).items.get(7).setValue(data.IsSupportAbsoluteThrottlePositionC); //-7
    this.items.get(2).items.get(8).setValue(data.IsSupportAcceleratorPedalPositionD); //-8
    this.items.get(2).items.get(9).setValue(data.IsSupportAcceleratorPedalPositionE); //-9
    this.items.get(2).items.get(10).setValue(data.IsSupportAcceleratorPedalPositionF); //-10
    this.items.get(2).items.get(11).setValue(data.IsSupportCommandedThrottleActuator); //-11
    this.items.get(2).items.get(12).setValue(data.IsSupportTimeRunWithMILOn); //-12
    this.items.get(2).items.get(13).setValue(data.IsSupportTimeSinceTroubleCodesCleared); //-13
    this.items.get(2).items.get(14).setValue(data.IsSupportMaximumValueForEquivalenceRatioOxygenSensorVoltageOxygenSensorCurrentAndIntakeManifoldAbsolutePressure); //-14
    this.items.get(2).items.get(15).setValue(data.IsSupportMaximumValueForAirFlowRateFromMassAirFlowSensor); //-15
    this.items.get(2).items.get(16).setValue(data.IsSupportFuelType); //-16
    this.items.get(2).items.get(17).setValue(data.IsSupportEthanolFuel); //-17
    this.items.get(2).items.get(18).setValue(data.IsSupportAbsoluteEvapSystemVapourPressure); //-18
    this.items.get(2).items.get(19).setValue(data.IsSupportEvapsystemvaporPressure); //-19
    this.items.get(2).items.get(20).setValue(data.IsSupportShortTermSecondaryOxygenSensorTrimBank1AndBank3); //-20
    this.items.get(2).items.get(21).setValue(data.IsSupportLongTermSecondaryOxygenSensorTrimBank1AndBank3); //-21
    this.items.get(2).items.get(22).setValue(data.IsSupportShortTermSecondaryOxygenSensorTrimBank2AndBank4); //-22
    this.items.get(2).items.get(23).setValue(data.IsSupportLongTermSecondaryOxygenSensorTrimBank2AndBank4); //-23
    this.items.get(2).items.get(24).setValue(data.IsSupportFuelRailPressureAbsolute); //-24
    this.items.get(2).items.get(25).setValue(data.IsSupportRelativeAcceleratorPedalPosition); //-25
    this.items.get(2).items.get(26).setValue(data.IsSupportHybridBatteryPackRemainingLife); //-26
    this.items.get(2).items.get(27).setValue(data.IsSupportEngineOilTemperature); //-27
    this.items.get(2).items.get(28).setValue(data.IsSupportFuelInjectionTiming); //-28
    this.items.get(2).items.get(29).setValue(data.IsSupportEngineFuelRate); //-29
    this.items.get(2).items.get(30).setValue(data.IsSupportEmissionRequirementsToWhichVehicleIsDesigned); //-30
    this.items.get(2).items.get(31).setValue(data.IsSupportPIDs41); //-31
}