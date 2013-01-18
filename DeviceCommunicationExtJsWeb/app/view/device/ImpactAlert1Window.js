Ext.define('DeviceCommunication.view.device.ImpactAlert1Window', {
    extend: 'Ext.window.Window',

    initComponent: function () {
        var store = Ext.create('Ext.data.Store', {
            model: 'DeviceCommunication.model.ImpactAlert1',
            sorters: [{ property: 'Index'}],
            groupField: 'MsgNumber',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            }
        });

        var store2 = Ext.create('Ext.data.Store', {
            model: 'DeviceCommunication.model.ImpactAlert1',
            sorters: [{ property: 'Index'}],
            groupField: 'MsgNumber',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            }
        });

        this.gridStore = store;
        this.chartStore = store2;

        Ext.apply(this, {
            title: 'Impact Alert -1 (High & Low sampling acceleration Raw BIN)',
            width: 1100,
            height: 600,
            layout: { type: 'border', padding: 5 },
            defaults: { split: true },
            items: [
                {// - 0
                    region: 'center',
                    layout: { type: 'border', padding: 5 },
                    items: [
                        {// -0
                            xtype: 'gridpanel',
                            title: 'Impact Alert -1 Message',
                            region: 'center',
                            features: [Ext.create('Ext.grid.feature.Grouping', {
                                groupHeaderTpl: 'MsgNumber - {name} ({rows.length} Row{[values.rows.length > 1 ? "s" : ""]})',
                                enableGroupingMenu: false
                            })],
                            store: store,
                            columns: [
                                { dataIndex: 'Index', text: 'Index', width: 50, sortable: false, align: 'right' },
                                { dataIndex: 'NumberOfDataPointInArray', text: '#Data', width: 50, sortable: false, align: 'right' },
                                { dataIndex: 'ValueOfXAxisAcceleration', text: 'Acc X', width: 100, sortable: false, align: 'right' },
                                { dataIndex: 'ValueOfYAxisAcceleration', text: 'Acc Y', width: 100, sortable: false, align: 'right' },
                                { dataIndex: 'ValueOfZAxisAcceleration', text: 'Acc Z', width: 100, sortable: false, align: 'right' },
                                { dataIndex: 'ArrayType', text: 'ArrayType', width: 100, sortable: false, align: 'center' },
			                    { dataIndex: 'ImpactUniqueID', text: 'ImpactUniqueID', width: 100, sortable: false, align: 'center' }
                            ]
                        },//end -0
                        {// -1
                            xtype: 'fieldset',
                            title: 'Delta V Adj Info',
                            region: 'north',
                            height: 150,
                            defaultType: 'textfield',
                            layout: { type: 'vbox', align: 'stretch' },
                            defaults: { labelWidth: 200, readOnly: true },
                            autoScroll: true,
                            items: [// - 0
                                    {fieldLabel: 'DeltaVAdj', name: 'Delta V Adj' }, // - 0
                                    {fieldLabel: 'Pdof', name: 'Pdof' }, // - 1
                                    {fieldLabel: 'TDetect', name: 'T Detect' }, // - 2
                                    {fieldLabel: 'TEnd', name: 'T End' }, // - 3
                                    {fieldLabel: 'TZero', name: 'T Zero'} // - 4
                            ]
                        }//end -1
                    ]
                }, //end -0
                {// - 1
                    region: 'east',
                    xtype: 'chart',
                    store: store2,
                    animate: false,
                    layout: 'fit',
                    width: 650, height: 300,
                    legend: { position: 'top' },
                    style: 'background:#fff',
                    axes: [{
                        type: 'Numeric',
                        position: 'left',
                        fields: ['ValueOfXAxisAcceleration', 'ValueOfYAxisAcceleration', 'ValueOfZAxisAcceleration'],
                        title: 'Acceleration',
                        minorTickSteps: 1,
                        grid: {
                            odd: { opacity: 1, fill: '#ddd', stroke: '#bbb', 'stroke-width': 0.5
                            }
                        }
                    }, {
                        type: 'Category',
                        position: 'bottom',
                        fields: ['Index'],
                        title: 'Index',
                        label: {
                            renderer: function (v) {
                                return Ext.String.ellipsis(v, 15, false);
                            },
                            font: '9px Arial',
                            rotate: {
                                degrees: 270
                            }
                        }
                }],
                series: [{
                    type: 'line',
                    highlight: { size: 5, radius: 5 },
                    axis: 'left',
                    smooth: true,
                    xField: 'Index',
                    yField: 'ValueOfXAxisAcceleration',
                    markerConfig: { type: 'circle', size: 2, radius: 2, 'stroke-width': 0 },
                    tips: {
                        trackMouse: true,
                        width: 120, height: 40,
                        renderer: function (storeItem, item) {
                            this.setTitle("Index: " + storeItem.get('Index') + '<br/> Acc X: ' + storeItem.get('ValueOfXAxisAcceleration'));
                        }
                    }
                }, //end ValueOfXAxisAcceleration
                            {
                            type: 'line',
                            highlight: { size: 5, radius: 5 },
                            axis: 'left',
                            smooth: true,
                            xField: 'Index',
                            yField: 'ValueOfYAxisAcceleration',
                            markerConfig: { type: 'circle', size: 2, radius: 2, 'stroke-width': 0 },
                            tips: {
                                trackMouse: true,
                                width: 120, height: 40,
                                renderer: function (storeItem, item) {
                                    this.setTitle("Index: " + storeItem.get('Index') + '<br/> Acc Y: ' + storeItem.get('ValueOfYAxisAcceleration'));
                                }
                            }
                        }, //end ValueOfYAxisAcceleration
                            {
                            type: 'line',
                            highlight: { size: 5, radius: 5 },
                            axis: 'left',
                            smooth: true,
                            xField: 'Index',
                            yField: 'ValueOfZAxisAcceleration',
                            markerConfig: { type: 'circle', size: 2, radius: 2, 'stroke-width': 0 },
                            tips: {
                                trackMouse: true,
                                width: 120, height: 40,
                                renderer: function (storeItem, item) {
                                    this.setTitle("Index: " + storeItem.get('Index') + '<br/> Acc Z: ' + storeItem.get('ValueOfZAxisAcceleration'));
                                }
                            }
                        }//end ValueOfZAxisAcceleration
                    ]//end series
            } //end -1
            ]
        }); //end Ext.apply

        DeviceCommunication.view.device.ImpactAlert1Window.superclass.initComponent.apply(this, arguments);
    } //end initComponent
});


DeviceCommunication.view.device.ImpactAlert1Window.prototype.view = function (impactArray1, deltaVAdj) {
    //console.log(Ext.encode(data));
    var gridpanel = this.items.get(0).items.get(0);

    var fillterData = [];
    for (var i = 0; i < impactArray1.length; i++) {
        if (-16 < impactArray1[i].ValueOfXAxisAcceleration && impactArray1[i].ValueOfXAxisAcceleration < 16) {
            if (-16 < impactArray1[i].ValueOfYAxisAcceleration && impactArray1[i].ValueOfYAxisAcceleration < 16) {
                if (-16 < impactArray1[i].ValueOfZAxisAcceleration && impactArray1[i].ValueOfZAxisAcceleration < 16) {
                    fillterData.push(impactArray1[i]);
                }
            }
        }
    }

    this.gridStore.loadData(impactArray1);
    this.chartStore.loadData(fillterData);

    var fieldset = this.items.get(0).items.get(1);
    fieldset.items.get(0).setValue(deltaVAdj.DeltaVAdj); //DeltaVAdj
    fieldset.items.get(1).setValue(deltaVAdj.Pdof); //Pdof
    fieldset.items.get(2).setValue(deltaVAdj.TDetect); //TDetect
    fieldset.items.get(3).setValue(deltaVAdj.TEnd); //TEnd
    fieldset.items.get(4).setValue(deltaVAdj.TZero); //TZero
}