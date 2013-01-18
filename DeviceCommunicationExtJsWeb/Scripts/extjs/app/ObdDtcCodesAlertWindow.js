
Ext.define('ObdDtcCodesAlertWindow', {
    extend: 'Ext.Window',
    initComponent: function () {
        Ext.apply(this, {
            width: 500,
            height: 550,
            hidden: false,
            //modal: true,
            title: 'ObdDtcCodesAlertWindow',
            bodyPadding: 5,
            resizable : false,
            items: [{
                xtype: 'fieldset',
                title: 'OBD DTC Codes Information',
                defaultType: 'textfield',
                bodyStyle: 'padding:5px 5px 0',
                layout: 'anchor',
                defaults: {
                    anchor: '100%',
                    labelWidth: 150,
                    readOnly : true
                },
                items: [
                    {fieldLabel: '<span data-qtip="BitwiseEncodePidMode01x01[B0, B4]">Misfire</span>', 
                        xtype: 'radiogroup', defaults: {readOnly : true},
                        items:[{boxLabel: 'Yes'}, {boxLabel: 'No'}]
                    },
                    {fieldLabel: '<span data-qtip="BitwiseEncodePidMode01x01[B1, B5]">Fuel System</span>',
                        xtype: 'radiogroup', defaults: {readOnly : true},
                        items:[{boxLabel: 'Yes'}, {boxLabel: 'No'}]
                    },
                    {fieldLabel: '<span data-qtip="BitwiseEncodePidMode01x01[B2, B6]">Components</span>',
                        xtype: 'radiogroup', defaults: {readOnly : true},
                        items:[{boxLabel: 'Yes'}, {boxLabel: 'No'}]
                    },
                    {fieldLabel: '<span data-qtip="BitwiseEncodePidMode01x01[B3, B7]">Reserved</span>',
                        xtype: 'radiogroup', defaults: {readOnly : true},
                        items:[{boxLabel: 'Yes'}, {boxLabel: 'No'}]
                    },
                    {fieldLabel: '<span data-qtip="BitwiseEncodePidMode01x01[C0, D0]">Catalyst</span>',
                        xtype: 'radiogroup', defaults: {readOnly : true},
                        items:[{boxLabel: 'Yes'}, {boxLabel: 'No'}]
                    },
                    {fieldLabel: '<span data-qtip="BitwiseEncodePidMode01x01[C1, D1]">Heated Catalyst</span>',
                        xtype: 'radiogroup', defaults: {readOnly : true},
                        items:[{boxLabel: 'Yes'}, {boxLabel: 'No'}]
                    },
                    {fieldLabel: '<span data-qtip="BitwiseEncodePidMode01x01[C2, D2]">Evaporative System</span>',
                        xtype: 'radiogroup', defaults: {readOnly : true},
                        items:[{boxLabel: 'Yes'}, {boxLabel: 'No'}]
                    },
                    {fieldLabel: '<span data-qtip="BitwiseEncodePidMode01x01[C3, D3]">Secondary Air System</span>',
                        xtype: 'radiogroup', defaults: {readOnly : true},
                        items:[{boxLabel: 'Yes'}, {boxLabel: 'No'}]
                    },
                    {fieldLabel: '<span data-qtip="BitwiseEncodePidMode01x01[C4, D4]">AC Refrigerant</span>',
                        xtype: 'radiogroup', defaults: {readOnly : true},
                        items:[{boxLabel: 'Yes'}, {boxLabel: 'No'}]
                    },
                    {fieldLabel: '<span data-qtip="BitwiseEncodePidMode01x01[C5, D5]">Oxygen Sensor</span>',
                        xtype: 'radiogroup', defaults: {readOnly : true},
                        items:[{boxLabel: 'Yes'}, {boxLabel: 'No'}]
                    },
                    {fieldLabel: '<span data-qtip="BitwiseEncodePidMode01x01[C6, D6]">Oxygen Sensor Heater</span>',
                        xtype: 'radiogroup', defaults: {readOnly : true},
                        items:[{boxLabel: 'Yes'}, {boxLabel: 'No'}]
                    },
                    {fieldLabel: '<span data-qtip="BitwiseEncodePidMode01x01[C7, D7]">EGR System</span>',
                        xtype: 'radiogroup', defaults: {readOnly : true},
                        items:[{boxLabel: 'Yes'}, {boxLabel: 'No'}]
                    },
                    {fieldLabel: '<span data-qtip="BitwiseEncodePidMode01x01[A7]">MIL Status</span>',
                        xtype: 'radiogroup', defaults: {readOnly : true},
                        items:[{boxLabel: 'Yes'}, {boxLabel: 'No'}]
                    },
                    {fieldLabel: '<span data-qtip="ObdStandard[0x01, 0x02, ... 0x0D]">ECU Compliant Standard</span>',emptyText: 'null'},
                    { fieldLabel: '<span data-qtip="Sum({PIDx00, PIDx20, PIDx40 | bit := 1})">Total PID Supported</span>', emptyText: 'null' },
                    { fieldLabel: 'DTC Codes Stored', emptyText: 'null' },
                    { fieldLabel: 'DTC Codes Pending', emptyText: 'null' },
                ]
            }]
        });

        ObdDtcCodesAlertWindow.superclass.initComponent.apply(this, arguments);
    },
    setMisfire: function (misfire) {
        var group = this.items.get(0).items.get(0);
        if(misfire != null){
            if(misfire)
                group.items.get(0).setValue(true);
            else
                group.items.get(1).setValue(true);
        }
    },
    setFuelSystem: function (fuelSystem) {
        var group = this.items.get(0).items.get(1);
        if(fuelSystem != null){
            if(fuelSystem)
                group.items.get(0).setValue(true);
            else
                group.items.get(1).setValue(true);
        }
    },
    setComponents: function (components) {
        var group = this.items.get(0).items.get(2);
        if(components != null){
            if(components)
                group.items.get(0).setValue(true);
            else
                group.items.get(1).setValue(true);
        }
    },
    setReserved: function (reserved) {
        var group = this.items.get(0).items.get(3);
        if(reserved != null){
            if(reserved)
                group.items.get(0).setValue(true);
            else
                group.items.get(1).setValue(true);
        }
    },
    setCatalyst: function (catalyst) {
        var group = this.items.get(0).items.get(4);
        if(catalyst != null){
            if(catalyst)
                group.items.get(0).setValue(true);
            else
                group.items.get(1).setValue(true);
        }
    },
    setHeatedCatalyst: function (heatedCatalyst) {
        var group = this.items.get(0).items.get(5);
        if(heatedCatalyst != null){
            if(heatedCatalyst)
                group.items.get(0).setValue(true);
            else
                group.items.get(1).setValue(true);
        }
    },
    setEvaporativeSystem: function (evaporativeSystem) {
        var group = this.items.get(0).items.get(6);
        if(evaporativeSystem != null){
            if(evaporativeSystem)
                group.items.get(0).setValue(true);
            else
                group.items.get(1).setValue(true);
        }
    },
    setSecondaryAirSystem: function (secondaryAirSystem) {
        var group = this.items.get(0).items.get(7);
        if(secondaryAirSystem != null){
            if(secondaryAirSystem)
                group.items.get(0).setValue(true);
            else
                group.items.get(1).setValue(true);
        }
    },
    setACRefrigerant: function (aCRefrigerant) {
        var group = this.items.get(0).items.get(8);
        if(aCRefrigerant != null){
            if(aCRefrigerant)
                group.items.get(0).setValue(true);
            else
                group.items.get(1).setValue(true);
        }
    },
    setOxygenSensor: function (oxygenSensor) {
        var group = this.items.get(0).items.get(9);
        if(oxygenSensor != null){
            if(oxygenSensor)
                group.items.get(0).setValue(true);
            else
                group.items.get(1).setValue(true);
        }
    },
    setOxygenSensorHeater: function (oxygenSensorHeater) {
        var group = this.items.get(0).items.get(10);
        if(oxygenSensorHeater != null){
            if(oxygenSensorHeater)
                group.items.get(0).setValue(true);
            else
                group.items.get(1).setValue(true);
        }
    },
    setEGRSystem: function (eGRSystem) {
        var group = this.items.get(0).items.get(11);
        if(eGRSystem != null){
            if(eGRSystem)
                group.items.get(0).setValue(true);
            else
                group.items.get(1).setValue(true);
        }
    },
    setMilStatus: function (milStatus) {
        var group = this.items.get(0).items.get(12);
        if(milStatus != null){
            if(milStatus)
                group.items.get(0).setValue(true);
            else
                group.items.get(1).setValue(true);
        }

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
    },
});

ObdDtcCodesAlertWindow.prototype.view = function (model) {
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