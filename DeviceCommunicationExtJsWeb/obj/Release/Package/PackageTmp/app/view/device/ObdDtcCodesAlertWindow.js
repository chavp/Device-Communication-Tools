var onBackgroundColor2 = function () {
    var val = this.getValue();
    console.log(val);
    var fieldLabel = this.getFieldLabel();
    if (val == 'true') {
        this.setFieldStyle('background: #8ecf81;');
        this.setValue(fieldLabel);
    } else if (val == 'false') {
        this.setFieldStyle('background: #ffa485;');
        this.setValue(fieldLabel);
    }

}

Ext.define('DeviceCommunication.view.device.ObdDtcCodesAlertWindow', {
    extend: 'Ext.Window',
    initComponent: function () {
        Ext.apply(this, {
            width: 550,
            height: 550,
            hidden: false,
            //modal: true,
            title: 'ObdDtcCodesAlertWindow',
            bodyPadding: 5,
            resizable: false,
            autoScroll: true,
            items: [{
                xtype: 'fieldset',
                title: 'OBD DTC Codes Information',
                defaultType: 'textfield',
                bodyStyle: 'padding:5px 5px 0',
                layout: 'anchor',
                defaults: {
                    anchor: '100%',
                    labelWidth: 150,
                    readOnly : true,
                    listeners: { render: onBackgroundColor2 }
                },
                items: [
                    { fieldLabel: 'Misfire', defaults: { readOnly: true }, hideLabel: true, emptyText: 'Misfire' }, //BitwiseEncodePidMode01x01[B0, B4]
                    {fieldLabel: 'Fuel System', defaults: { readOnly: true }, hideLabel: true, emptyText: 'Fuel System' }, //BitwiseEncodePidMode01x01[B1, B5]
                    {fieldLabel: 'Components', defaults: { readOnly: true }, hideLabel: true, emptyText: 'Components' }, //BitwiseEncodePidMode01x01[B2, B6]
                    {fieldLabel: 'Reserved', defaults: { readOnly: true }, hideLabel: true, emptyText: 'Reserved' }, //BitwiseEncodePidMode01x01[B3, B7]
                    {fieldLabel: 'Catalyst', defaults: { readOnly: true }, hideLabel: true, emptyText: 'Catalyst' }, //BitwiseEncodePidMode01x01[C0, D0]
                    {fieldLabel: 'Heated Catalyst', defaults: { readOnly: true }, hideLabel: true, emptyText: 'Heated Catalyst' }, //BitwiseEncodePidMode01x01[C1, D1]
                    {fieldLabel: 'Evaporative System', defaults: { readOnly: true }, hideLabel: true, emptyText: 'Evaporative System' }, //BitwiseEncodePidMode01x01[C2, D2]
                    {fieldLabel: 'Secondary Air System', defaults: { readOnly: true }, hideLabel: true, emptyText: 'Secondary Air System' }, //BitwiseEncodePidMode01x01[C3, D3]
                    {fieldLabel: 'AC Refrigerant', defaults: { readOnly: true }, hideLabel: true, emptyText: 'AC Refrigerant' }, //BitwiseEncodePidMode01x01[C4, D4]
                    {fieldLabel: 'Oxygen Sensor', defaults: { readOnly: true }, hideLabel: true, emptyText: 'Oxygen Sensor' }, //BitwiseEncodePidMode01x01[C5, D5]
                    {fieldLabel: 'Oxygen Sensor Heater', defaults: { readOnly: true }, hideLabel: true, emptyText: 'Oxygen Sensor Heater' }, //BitwiseEncodePidMode01x01[C6, D6]
                    {fieldLabel: 'EGR System', defaults: { readOnly: true }, hideLabel: true, emptyText: 'EGR System' }, //BitwiseEncodePidMode01x01[C7, D7]
                    {fieldLabel: 'MIL Status', defaults: { readOnly: true }, hideLabel: true, emptyText: 'MIL Status' }, //BitwiseEncodePidMode01x01[A7]

                    { fieldLabel: '<span data-qtip="ObdStandard[0x01, 0x02, ... 0x0D]">ECU Compliant Standard</span>', emptyText: 'null'},
                    { fieldLabel: '<span data-qtip="Sum({PIDx00, PIDx20, PIDx40 | bit := 1})">Total PID Supported</span>', emptyText: 'null' },
                    { fieldLabel: 'DTC Codes Stored', emptyText: 'null' },
                    { fieldLabel: 'DTC Codes Pending', emptyText: 'null' },
                ]
            }]
        });

        DeviceCommunication.view.device.ObdDtcCodesAlertWindow.superclass.initComponent.apply(this, arguments);
    },
    setMisfire: function (misfire) {
        var group = this.items.get(0).items.get(0);
        group.setValue(misfire);
    },
    setFuelSystem: function (fuelSystem) {
        var group = this.items.get(0).items.get(1);
        group.setValue(fuelSystem);
    },
    setComponents: function (components) {
        var group = this.items.get(0).items.get(2);
        group.setValue(components);
    },
    setReserved: function (reserved) {
        var group = this.items.get(0).items.get(3);
        group.setValue(reserved);
    },
    setCatalyst: function (catalyst) {
        var group = this.items.get(0).items.get(4);
        group.setValue(catalyst);
    },
    setHeatedCatalyst: function (heatedCatalyst) {
        var group = this.items.get(0).items.get(5);
        group.setValue(heatedCatalyst);
    },
    setEvaporativeSystem: function (evaporativeSystem) {
        var group = this.items.get(0).items.get(6);
        group.setValue(evaporativeSystem);
    },
    setSecondaryAirSystem: function (secondaryAirSystem) {
        var group = this.items.get(0).items.get(7);
        group.setValue(secondaryAirSystem);
    },
    setACRefrigerant: function (aCRefrigerant) {
        var group = this.items.get(0).items.get(8);
        group.setValue(aCRefrigerant);
    },
    setOxygenSensor: function (oxygenSensor) {
        var group = this.items.get(0).items.get(9);
        group.setValue(oxygenSensor);
    },
    setOxygenSensorHeater: function (oxygenSensorHeater) {
        var group = this.items.get(0).items.get(10);
        group.setValue(oxygenSensorHeater);
    },
    setEGRSystem: function (eGRSystem) {
        var group = this.items.get(0).items.get(11);
        group.setValue(eGRSystem);
    },
    setMilStatus: function (milStatus) {
        var group = this.items.get(0).items.get(12);
        group.setValue(milStatus);
    },

    setECUCompliantStandard: function (eCUCompliantStandard) {
        this.items.get(0).items.get(13).setValue(eCUCompliantStandard);
    },
    setTotalPIDSupported: function (totalPIDSupported) {
        this.items.get(0).items.get(14).setValue(totalPIDSupported);
    },
    setDtcCodesStored: function (dtcCodesStored) {
        this.items.get(0).items.get(15).setValue(dtcCodesStored);
    },
    setDtcCodesPending: function (dtcCodesPending) {
        this.items.get(0).items.get(16).setValue(dtcCodesPending);
    }
});

DeviceCommunication.view.device.ObdDtcCodesAlertWindow.prototype.view = function (model) {
    this.setMisfire(model.Misfire);
    this.setFuelSystem(model.FuelSystem);
    this.setComponents(model.Components);
    this.setReserved(model.Reserved);
    this.setCatalyst(model.Catalyst);
    this.setHeatedCatalyst(model.HeatedCatalyst);
    this.setEvaporativeSystem(model.EvaporativeSystem);
    this.setSecondaryAirSystem(model.SecondaryAirSystem);
    this.setACRefrigerant(model.ACRefrigerant);
    this.setOxygenSensor(model.OxygenSensor);
    this.setOxygenSensorHeater(model.OxygenSensorHeater);
    this.setEGRSystem(model.EGRSystem);
    this.setMilStatus(model.MilStatus);
    this.setECUCompliantStandard(model.ECUCompliantStandard);
    this.setTotalPIDSupported(model.TotalPIDSupported);

    var dtcCodesStored = "";
    for (var i = 0; i < model.DtcCodesStored.length; i++) {
        dtcCodesStored += model.DtcCodesStored[i] + "|";
    }
    this.setDtcCodesStored(dtcCodesStored);

    var dtcCodesPending = "";
    for (var i = 0; i < model.DtcCodesPending.length; i++) {
        dtcCodesPending += model.DtcCodesPending[i] + "|";
    }
    this.setDtcCodesPending(dtcCodesPending);

}