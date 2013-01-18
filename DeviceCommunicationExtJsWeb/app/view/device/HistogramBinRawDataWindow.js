Ext.define('DeviceCommunication.view.device.HistogramBinRawDataWindow', {
    extend: 'Ext.Window',

    initComponent: function () {

        var me = this;

        var store = Ext.create('Ext.data.Store', {
            model: 'DeviceCommunication.model.BinRawData',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'Episodes'
                }
            }
        });
        me.store = store;

        var store1 = Ext.create('Ext.data.Store', {
            model: 'DeviceCommunication.model.BinRawData',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'Episodes'
                }
            }
        });
        me.store1 = store1;

        var store2 = Ext.create('Ext.data.Store', {
            model: 'DeviceCommunication.model.BinRawData',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'Episodes'
                }
            }
        });
        me.store2 = store2;

        var store3 = Ext.create('Ext.data.Store', {
            model: 'DeviceCommunication.model.BinRawData',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'Episodes'
                }
            }
        });
        me.store3 = store3;

        var store4 = Ext.create('Ext.data.Store', {
            model: 'DeviceCommunication.model.BinRawData',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'Episodes'
                }
            }
        });
        me.store4 = store4;

        var speedChart = {
            xtype: 'chart', title: 'Speed', shadow: true, style: 'background:#fff',
            store: store,
            title: "Speed",
            id: 'speed-chart',
            iconCls: 'icon-tabs',
            listeners: {
                activate: function (tab) {
                    var gridTab = me.items.get(1);
                    gridTab.setActive(Ext.getCmp('speed-grid'));
                }
            },
            axes: [{// - 0
                type: 'Numeric', position: 'left', fields: ['Data'], title: '#Speed', minimum: 0, grid: true
            }, {// - 1
                type: 'Category',
                position: 'bottom',
                fields: ['Label'],
                title: 'Speed histogram [end journey]',
                label: {
                    renderer: function (v) {
                        return Ext.String.ellipsis(v, 15, false);
                    },
                    font: '9px Arial',
                    rotate: {
                        degrees: 270
                    }
                }
            }], //end axes
            series: [{
                type: 'column',
                axis: 'left',
                //highlight: true,
                xField: 'Index',
                yField: ['Data'],
                tips: {
                    trackMouse: true,
                    width: 120,
                    height: 50,
                    renderer: function (storeItem, item) {
                        this.setTitle("Index: " + storeItem.get('Index') + '<br />Value: ' + storeItem.get('Data') + '<br />Label: ' + storeItem.get('Label'));
                    }
                },
                style: {
                    fill: '#38B8BF'
                },
//                highlightCfg: {
//                    fill: '#a2b5ca'
//                },
                label: {
                    contrast: true,
                    display: 'insideEnd',
                    field: 'Data',
                    color: '#000',
                    orientation: 'vertical',
                    'text-anchor': 'middle'
                }
            }]//end series
        }; //end chart speed
        me.speedChart = speedChart;

        var xChart = {
            xtype: 'chart', title: 'X', width: 800, height: 500, animate: false,
            shadow: true,
            style: 'background:#fff',
            store: store1,
            title: "X",
            id: 'x-chart',
            iconCls: 'icon-tabs',
            listeners: {
                activate: function (tab) {
                    var gridTab = me.items.get(1);
                    gridTab.setActive(Ext.getCmp('x-grid'));
                }
            },
            axes: [{// - 0
                type: 'Numeric', position: 'left', fields: ['Data'], title: '#X', minimum: 0, grid: true
            }, {// - 1
                type: 'Category',
                position: 'bottom',
                fields: ['Label'],
                title: 'X histogram',
                label: {
                    renderer: function (v) {
                        return Ext.String.ellipsis(v, 15, false);
                    },
                    font: '9px Arial',
                    rotate: {
                        degrees: 270
                    }
                }
            }], //end axes
            series: [{
                type: 'column',
                axis: 'left',
                //highlight: true,
                xField: 'Index',
                yField: ['Data'],
                tips: {
                    trackMouse: true,
                    width: 120,
                    height: 50,
                    renderer: function (storeItem, item) {
                        this.setTitle("Index: " + storeItem.get('Index') + '<br />Value: ' + storeItem.get('Data') + '<br />Label: ' + storeItem.get('Label'));
                    }
                },
                style: {
                    fill: '#38B8BF'
                },
//                highlightCfg: {
//                    fill: '#a2b5ca'
//                },
                label: {
                    contrast: true,
                    display: 'insideEnd',
                    field: 'Data',
                    color: '#000',
                    orientation: 'vertical',
                    'text-anchor': 'middle'
                }
            }]//end series
        }; //end chart X
        me.xChart = xChart;

        var yChart = {
            xtype: 'chart', title: 'Y', width: 800, height: 500, animate: false,
            shadow: true,
            style: 'background:#fff',
            store: store2,
            title: "Y",
            id: 'y-chart',
            iconCls: 'icon-tabs',
            listeners: {
                activate: function (tab) {
                    var gridTab = me.items.get(1);
                    gridTab.setActive(Ext.getCmp('y-grid'));
                }
            },
            axes: [{// - 0
                type: 'Numeric', position: 'left', fields: ['Data'], title: '#Y', minimum: 0, grid: true
            }, {// - 1
                type: 'Category',
                position: 'bottom',
                fields: ['Label'],
                title: 'Y histogram',
                label: {
                    renderer: function (v) {
                        return Ext.String.ellipsis(v, 15, false);
                    },
                    font: '9px Arial',
                    rotate: {
                        degrees: 270
                    }
                }
            }], //end axes
            series: [{
                type: 'column',
                axis: 'left',
                //highlight: true,
                xField: 'Index',
                yField: ['Data'],
                tips: {
                    trackMouse: true,
                    width: 120,
                    height: 50,
                    renderer: function (storeItem, item) {
                        this.setTitle("Index: " + storeItem.get('Index') + '<br />Value: ' + storeItem.get('Data') + '<br />Label: ' + storeItem.get('Label'));
                    }
                },
                style: {
                    fill: '#38B8BF'
                },
//                highlightCfg: {
//                    fill: '#a2b5ca'
//                },
                label: {
                    contrast: true,
                    display: 'insideEnd',
                    field: 'Data',
                    color: '#000',
                    orientation: 'vertical',
                    'text-anchor': 'middle'
                }
            }]//end series
        }; //end chart Y
        me.yChart = yChart;

        var zChart = {
            xtype: 'chart', title: 'Z', width: 800, height: 500, animate: false,
            shadow: true,
            style: 'background:#fff',
            store: store3,
            title: "Z",
            id: 'z-chart',
            iconCls: 'icon-tabs',
            listeners: {
                activate: function (tab) {
                    var gridTab = me.items.get(1);
                    gridTab.setActive(Ext.getCmp('z-grid'));
                }
            },
            axes: [{// - 0
                type: 'Numeric', position: 'left', fields: ['Data'], title: '#Z', minimum: 0, grid: true
            }, {// - 1
                type: 'Category',
                position: 'bottom',
                fields: ['Label'],
                title: 'Z histogram',
                label: {
                    renderer: function (v) {
                        return Ext.String.ellipsis(v, 15, false);
                    },
                    font: '9px Arial',
                    rotate: {
                        degrees: 270
                    }
                }
            }], //end axes
            series: [{
                type: 'column',
                axis: 'left',
                //highlight: true,
                xField: 'Index',
                yField: ['Data'],
                tips: {
                    trackMouse: true,
                    width: 120,
                    height: 50,
                    renderer: function (storeItem, item) {
                        this.setTitle("Index: " + storeItem.get('Index') + '<br />Value: ' + storeItem.get('Data') + '<br />Label: ' + storeItem.get('Label'));
                    }
                },
                style: {
                    fill: '#38B8BF'
                },
//                highlightCfg: {
//                    fill: '#a2b5ca'
//                },
                label: {
                    contrast: true,
                    display: 'insideEnd',
                    field: 'Data',
                    color: '#000',
                    orientation: 'vertical',
                    'text-anchor': 'middle'
                }
            }]//end series
        }; //end chart Z
        me.zChart = zChart;

        var rpmChart = {
            xtype: 'chart', title: 'RPM', width: 800, height: 500, animate: false,
            shadow: true,
            style: 'background:#fff',
            store: store4,
            title: "RPM",
            id: 'rpm-chart',
            iconCls: 'icon-tabs',
            listeners: {
                activate: function (tab) {
                    var gridTab = me.items.get(1);
                    //console.log(gridTab);
                    gridTab.setActive(Ext.getCmp('rpm-grid'));
                }
            },
            axes: [{// - 0
                type: 'Numeric', position: 'left', fields: ['Data'], title: '#RPM', minimum: 0, grid: true
            }, {// - 1
                type: 'Category',
                position: 'bottom',
                fields: ['Label'],
                title: 'RPM histogram',
                label: {
                    renderer: function (v) {
                        return Ext.String.ellipsis(v, 15, false);
                    },
                    font: '9px Arial',
                    rotate: {
                        degrees: 270
                    }
                }
            }], //end axes
            series: [{
                type: 'column',
                axis: 'left',
                //highlight: true,
                xField: 'Index',
                yField: ['Data'],
                tips: {
                    trackMouse: true,
                    width: 120,
                    height: 50,
                    renderer: function (storeItem, item) {
                        this.setTitle("Index: " + storeItem.get('Index') + '<br />Value: ' + storeItem.get('Data') + '<br />Label: ' + storeItem.get('Label'));
                    }
                },
                style: {
                    fill: '#38B8BF'
                },
//                highlightCfg: {
//                    fill: '#a2b5ca'
//                },
                label: {
                    contrast: true,
                    display: 'insideEnd',
                    field: 'Data',
                    color: '#000',
                    orientation: 'vertical',
                    'text-anchor': 'middle'
                }
            }]//end series
        }; //end chart RPM
        me.rpmChart = rpmChart;

        Ext.apply(this, {
            title: 'Histogram',
            width: 1200,
            height: 500,
            layout: { type: 'border', padding: 5 },
            defaults: { split: true },
            items: [{
                xtype: 'panel',
                title: 'HistogramBinRawData',
                region: 'center',
                layout: { type: 'border', padding: 5 },
                defaults: { split: true, autoScroll: true },
                items: [{// - 0
                    xtype: 'fieldset',
                    title: 'HistogramBinDataRow',
                    region: 'center',
                    defaultType: 'textfield',
                    layout: { type: 'vbox', align: 'stretch' },
                    defaults: { labelWidth: 200, readOnly: true },
                    items: [// - 0
                        {fieldLabel: 'Seq', name: 'Seq' }, // - 0
                        {fieldLabel: 'Header Time(UTC)', name: 'HeaderTime' }, // - 1
                        {fieldLabel: 'Version', name: 'Version' }, // - 2
                        {fieldLabel: 'UniquedIdNumberForHistogram', name: 'UniquedIdNumberForHistogram' }, // - 3
                        {fieldLabel: 'SequenceCounterForFragmentation', name: 'SequenceCounterForFragmentation'} // - 4
                    ]
                }, {// - 1
                    xtype: 'tabpanel',
                    title: 'RawData',
                    region: 'south',
                    height: 220,
                    items: [{
                        xtype: 'gridpanel',
                        title: 'Speed',
                        store: store,
                        id: 'speed-grid',
                        iconCls: 'icon-tabs',
                        listeners: {
                            activate: function (tab) {
                                var chartTab = this.up().up().up().items.get(1);
                                chartTab.setActive(Ext.getCmp('speed-chart'));
                            }
                        },
                        columns: [
                                { dataIndex: 'Index', text: 'Index', width: 50, sortable: false, align: 'right' },
                                { dataIndex: 'Data', text: 'Value', width: 120, sortable: false, align: 'right' },
                                { dataIndex: 'Label', text: 'Label', width: 120, sortable: false, align: 'center' }
                            ]
                    }, {
                        xtype: 'gridpanel',
                        title: 'X',
                        store: store1,
                        id: 'x-grid',
                        iconCls: 'icon-tabs',
                        listeners: {
                            activate: function (tab) {
                                var chartTab = this.up().up().up().items.get(1);
                                chartTab.setActive(Ext.getCmp('x-chart'));
                            }
                        },
                        columns: [
                                { dataIndex: 'Index', text: 'Index', width: 50, sortable: false, align: 'right' },
                                { dataIndex: 'Data', text: 'Value', width: 120, sortable: false, align: 'right' },
                                { dataIndex: 'Label', text: 'Label', width: 120, sortable: false, align: 'center' }
                            ]
                    }, {
                        xtype: 'gridpanel',
                        title: 'Y',
                        store: store2,
                        id: 'y-grid',
                        iconCls: 'icon-tabs',
                        listeners: {
                            activate: function (tab) {
                                var chartTab = this.up().up().up().items.get(1);
                                chartTab.setActive(Ext.getCmp('y-chart'));
                            }
                        },
                        columns: [
                                { dataIndex: 'Index', text: 'Index', width: 50, sortable: false, align: 'right' },
                                { dataIndex: 'Data', text: 'Value', width: 120, sortable: false, align: 'right' },
                                { dataIndex: 'Label', text: 'Label', width: 120, sortable: false, align: 'center' }
                            ]
                    }, {
                        xtype: 'gridpanel',
                        title: 'Z',
                        store: store3,
                        id: 'z-grid',
                        iconCls: 'icon-tabs',
                        listeners: {
                            activate: function (tab) {
                                var chartTab = this.up().up().up().items.get(1);
                                chartTab.setActive(Ext.getCmp('z-chart'));
                            }
                        },
                        columns: [
                                { dataIndex: 'Index', text: 'Index', width: 50, sortable: false, align: 'right' },
                                { dataIndex: 'Data', text: 'Value', width: 120, sortable: false, align: 'right' },
                                { dataIndex: 'Label', text: 'Label', width: 120, sortable: false, align: 'center' }
                            ]
                    }, {
                        xtype: 'gridpanel',
                        title: 'RPM',
                        store: store4,
                        id: 'rpm-grid',
                        iconCls: 'icon-tabs',
                        listeners: {
                            activate: function (tab) {
                                var chartTab = this.up().up().up().items.get(1);
                                chartTab.setActive(Ext.getCmp('rpm-chart'));
                            }
                        },
                        columns: [
                                { dataIndex: 'Index', text: 'Index', width: 50, sortable: false, align: 'right' },
                                { dataIndex: 'Data', text: 'Value', width: 120, sortable: false, align: 'right' },
                                { dataIndex: 'Label', text: 'Label', width: 120, sortable: false, align: 'center' }
                            ]
                    }
                    ]
                }, {// - 2
                    xtype: 'fieldset',
                    title: 'HistogramInfo',
                    region: 'north',
                    height: 210,
                    defaultType: 'textfield',
                    layout: { type: 'vbox', align: 'stretch' },
                    defaults: { labelWidth: 200, readOnly: true },
                    items: [// - 0
                        {fieldLabel: 'Seq', name: 'Seq' }, // - 0
                        {fieldLabel: 'Header Time(UTC)', name: 'HeaderTime' }, // - 1
                        {fieldLabel: 'Version', name: 'Version' }, // - 2
                        {fieldLabel: 'UniquedIdNumberForHistogram', name: 'UniquedIdNumberForHistogram' }, // - 3
                        {fieldLabel: 'HistogramBinDefinitionIndexKey', name: 'HistogramBinDefinitionIndexKey' }, // - 4
                        {fieldLabel: 'RawBinSize', name: 'RawBinSize' }, // - 5
                        {fieldLabel: 'HistogramType', name: 'HistogramType'}// - 6
                    ]
                }]
            },
            {//- 1
                xtype: 'tabpanel',
                title: 'HistogramBinRawData Charts',
                region: 'east',
                width: 800,
                layout: 'fit',
                items: [
                    speedChart, xChart, yChart, zChart, rpmChart
                ]//end - 1 items
            }//end - 1
        ]
        });

        DeviceCommunication.view.device.HistogramBinRawDataWindow.superclass.initComponent.apply(this, arguments);
    }
});


DeviceCommunication.view.device.HistogramBinRawDataWindow.prototype.view = function (header, raw_data, raw_data2, raw_data3, info) {
    //console.log(Ext.encode(data));
    //    var gridpanel = this.items.get(0).items.get(1).items.get(0); //Speed
    //    var gridpanel1 = this.items.get(0).items.get(1).items.get(1); //X
    //    var gridpanel2 = this.items.get(0).items.get(1).items.get(2); //Y
    //    var gridpanel3 = this.items.get(0).items.get(1).items.get(3); //Z
    //    var gridpanel4 = this.items.get(0).items.get(1).items.get(4); //RPM

    this.store.loadData(raw_data);

    var chart = this.speedChart; //Speed
    var chart1 = this.xChart; //X
    var chart2 = this.yChart; //Y
    var chart3 = this.zChart; //Z
    var chart4 = this.rpmChart; //RPM

    //    console.log(raw_data);
    //    console.log(raw_data2);
    //    console.log(raw_data3);

    if (info != null) {
        if (info.HistogramType === 4) {
            //chart.axes.items[1].title = "Speed histogram [end journey]";
        } else if (info.HistogramType === 1) {
            //chart.axes.items[1].title = "Z & Speed histogram [end journey]";
            this.store3.loadData(raw_data2);
        } else if (info.HistogramType === 2) {
            //chart.axes.items[1].title = "X & Y & Speed histogram [end journey]";
            this.store1.loadData(raw_data2);
            this.store2.loadData(raw_data3);
        } else if (info.HistogramType === 3) {
            //chart.axes.items[1].title = "RPM & Speed histogram [end journey]";
            this.store4.loadData(raw_data2);
        }
    }
    //console.log(chart);

    //-> /Date(1326683391000)/

    var ticks = header.HeaderTime.replace("/Date(", "").replace(")/", "");
    var date = new Date();
    date.setTime(ticks);

    var fieldcontainer = this.items.get(0).items.get(0);
    fieldcontainer.items.items[0].setValue(header.Seq);
    fieldcontainer.items.items[1].setValue(date.format('dd/mm/yyyy HH:MM:ss'));
    fieldcontainer.items.items[2].setValue(header.Version);
    fieldcontainer.items.items[3].setValue(header.UniquedIdNumberForHistogram);
    fieldcontainer.items.items[4].setValue(header.SequenceCounterForFragmentation);

    if (info != null) {
        var fieldInContainer = this.items.get(0).items.get(3);
        console.log(fieldInContainer);
        fieldInContainer.items.get(0).setValue(info.Seq);
        ticks = info.HeaderTime.replace("/Date(", "").replace(")/", "");
        date.setTime(ticks);
        fieldInContainer.items.get(1).setValue(date.format('dd/mm/yyyy HH:MM:ss'));
        fieldInContainer.items.get(2).setValue(info.Version);
        fieldInContainer.items.get(3).setValue(info.UniquedIdNumberForHistogram);
        fieldInContainer.items.get(4).setValue(info.HistogramBinDefinitionIndexKey);
        fieldInContainer.items.get(5).setValue(info.RawBinSize);
        fieldInContainer.items.get(6).setValue(info.HistogramType);
    }
    //console.log(fieldcontainer.xtype);
}