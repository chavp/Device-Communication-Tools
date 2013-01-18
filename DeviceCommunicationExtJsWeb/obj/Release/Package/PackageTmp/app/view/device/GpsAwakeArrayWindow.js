Ext.define('DeviceCommunication.view.device.GpsAwakeArrayWindow', {
    extend: 'Ext.Window',
    alias: 'widget.gpsawakearraywindow',
    initComponent: function () {
        var me = this;

        var store = Ext.create('Ext.data.Store', {
            model: 'DeviceCommunication.model.GpsAwake',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'gpsAwakes'
                }
            }
        });
        me.store = store;

        var chs = Ext.create('Ext.data.JsonStore', {
            model: 'DeviceCommunication.model.GpsAwake',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'gpsAwakes'
                }
            }
        });
        me.chs = chs;

        Ext.apply(this, {
            title: 'GPS Awake Array Window',
            width: 900, height: 500,
            layout: { type: 'border', padding: 5 },
            defaults: { split: true },
            items: [
                {
                    xtype: 'gridpanel',
                    title: 'GPS Awake',
                    region: 'center',
                    columns: [
                        { dataIndex: 'SvId', text: 'SV ID', width: 50, sortable: false, align: 'center' },
                        { dataIndex: 'SvC_No', text: 'SVC No', width: 100, sortable: false, align: 'right' },
                        { dataIndex: 'SvElevation', text: 'SV Elevation', width: 100, sortable: false, align: 'right' },
                        { dataIndex: 'SvAzimuth', text: 'SV Azimuth', width: 100, sortable: false, align: 'right' }
                    ],
                    store: store
                },
                {
                    xtype: 'panel',
                    region: 'east',
                    layout: { type: 'border', padding: 5 },
                    defaults: { split: true },
                    width: 500,
                    items: [{
                        xtype: 'chart', animate: true, shadow: true,
                        region: 'center',
                        style: 'background:#fff',
                        store: store,
                        axes: [{// - 0
                            type: 'Numeric', position: 'left', fields: ['SvC_No'], title: 'SVC No', minimum: 0, grid: true,
                            steps: 6, maximum: 50
                        }, {// - 1
                            type: 'Category',
                            position: 'bottom',
                            fields: ['SvId', 'SvC_No_Threshold'],
                            title: 'SV ID',
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
                            xField: 'SvId',
                            yField: ['SvC_No'],
                            tips: {
                                trackMouse: true,
                                width: 120,
                                height: 50,
                                renderer: function (storeItem, item) {
                                    this.setTitle("SV ID: " + storeItem.get('SvId') + '<br />SVC No: ' + storeItem.get('SvC_No'));
                                }
                            },
                            style: {
                                fill: '#38B8BF'
                            },
                            label: {
                                contrast: true,
                                display: 'insideEnd',
                                field: 'SvC_No',
                                color: '#000',
                                orientation: 'vertical',
                                'text-anchor': 'middle'
                            }
                        }, {
                            type: 'line',
                            axis: 'left',
                            //smooth: true,
                            xField: 'SvId',
                            yField: 'SvC_No_Threshold',
                            style: {
                                fill: '#f44610',
                                stroke: '#f44610',
                                'stroke-width': 4
                            },
                            markerConfig: {
                                type: 'circle',
                                size: 0,
                                radius: 0
                            }
                        }]//end series
                    },
                    {
                        xtype: 'chart',
                        region: 'south',
                        insetPadding: 20,
                        style: 'background:#fff',
                        animate: false,
                        store: chs,
                        theme: 'Blue',
                        flex: 1.2,
                        height: 200,
                        axes: [{
                            steps: 9,
                            type: 'Radial',
                            position: 'radial',
                            maximum: 90
                        }],
                        series: [{
                            type: 'radar',
                            xField: 'SvAzimuth',
                            yField: 'SvElevation',
                            showInLegend: false,
                            showMarkers: true,
                            markerConfig: {
                                radius: 3, size: 3
                            },
                            tips: {
                                trackMouse: true,
                                width: 120,
                                height: 50,
                                renderer: function (storeItem, item) {
                                    this.setTitle("SV ID: " + storeItem.get('SvId') + '<br />SV Elevation: ' + storeItem.get('SvElevation'));
                                }
                            },
                            style: {
                                'stroke-width': 0.0,
                                opacity: 0.5,
                                fill: 'none'
                            }
                        }]
                    }
                    ]
                }
            ]
        });

        DeviceCommunication.view.device.GpsAwakeArrayWindow.superclass.initComponent.apply(this, arguments);
    }
});

DeviceCommunication.view.device.GpsAwakeArrayWindow.prototype.view = function (data) {

    this.store.loadData(data.gpsAwakes);
    this.chs.loadData(data.radialResult);
}