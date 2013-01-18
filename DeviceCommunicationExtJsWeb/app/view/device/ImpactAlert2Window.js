Ext.define('DeviceCommunication.view.device.ImpactAlert2Window', {
    extend: 'Ext.window.Window',
    initComponent: function () {
        var store = Ext.create('Ext.data.Store', {
            model: 'DeviceCommunication.model.ImpactAlert2',
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

        Ext.apply(this, {
            title: 'Impact Alert - 2 (Raw Geopoint sampling Raw BIN)',
            width: 1100,
            height: 600,
            layout: { type: 'border', padding: 5 },
            defaults: { split: true, layout: 'fit' },
            items: [
                {// - 0
                    xtype: 'gridpanel',
                    title: 'Impact Alert -2 Message',
                    region: 'center',
                    //height: 220,
                    features: [Ext.create('Ext.grid.feature.Grouping', {
                        groupHeaderTpl: 'MsgNumber - {name} ({rows.length} Row{[values.rows.length > 1 ? "s" : ""]})',
                        enableGroupingMenu: false
                    })],
                    store: store,
                    columns: [
                        { dataIndex: 'Index', text: 'Index', width: 50, sortable: false, align: 'right' },
                        { dataIndex: 'UniqueJouneyId', text: 'JNEY Id', width: 50, sortable: false },
                        { dataIndex: 'UtcTime', text: 'UtcTime', width: 100, sortable: false, renderer: Ext.util.Format.dateRenderer('d/m/Y H:i') },
                        { dataIndex: 'Latitude', text: 'Latitude', width: 100, sortable: false, align: 'right' },
                        { dataIndex: 'Longitude', text: 'Longitude', width: 100, sortable: false, align: 'right' },
                        { dataIndex: 'Altitude', text: 'Altitude', width: 100, sortable: false, align: 'right' },
                        { dataIndex: 'GroundSpeed', text: 'G-Speed', width: 100, sortable: false, align: 'right' },
                        { dataIndex: 'Heading', text: 'Heading', width: 100, sortable: false, align: 'right' },
                        { dataIndex: 'NumberOfSatellitesUsed', text: '#SatellitesUsed', width: 100, sortable: false, align: 'right' },

                        { dataIndex: 'ArrayType', text: 'ArrayType', width: 100, sortable: false, align: 'center' },
			            { dataIndex: 'ImpactUniqueID', text: 'ImpactUniqueID', width: 100, sortable: false, align: 'center' },
                        { dataIndex: 'NumberOfDataPointInArray', text: '#Data', width: 50, sortable: false, align: 'right' }
                    ]
                }, //end gridpanel
                {
                region: 'east',
                xtype: 'chart',
                width: 650, height: 300,
                style: 'background:#fff',
                animate: false,
                store: store,
                layout: 'fit',
                axes: [
                        { type: 'Numeric', position: 'left', fields: ['LatitudePlot'], title: 'Latitude',
                            label: {
                                renderer: function (v) {
                                    return v / 10000000;
                                }
                            }
                        },
                        { type: 'Numeric', position: 'bottom', fields: ['LongitudePlot'], title: 'Longitude',
                            label: {
                                renderer: function (v) {
                                    return v / 10000000;
                                }
                            }
                        }
                    ],
                series: [{
                    type: 'scatter', xField: 'LongitudePlot', yField: 'LatitudePlot', color: '#ccc',
                    markerConfig: { type: 'circle', radius: 3, size: 2 },
                    renderer: function (sprite, record, attributes, index, store) {
                        var impact = -30 + index;
                        if (impact == 0) {
                            sprite.attr.fill = 'RED';
                            sprite.attr.size = 5;
                            console.log(sprite);
                        }
                        return attributes;
                    },
                    tips: {
                        trackMouse: true,
                        width: 230, height: 50,
                        renderer: function (storeItem, item) {
                            this.setTitle("Index: " + storeItem.get('Index') + '<br/>Geopoint: (' + storeItem.get('Latitude') + ", " + storeItem.get('Longitude') + ")");
                        }
                    }
                }]
            },
                {
                    region: 'south', xtype: 'chart', height: 200, style: 'background:#fff', animate: false,
                    store: store,
                    layout: 'fit',
                    axes: [
                        {
                            type: 'Numeric', position: 'left', fields: ['GroundSpeed'],
                            title: 'Speed',
                            grid: true
                        }, {
                            type: 'Category', position: 'bottom', fields: ['Index'],
                            title: 'Index',
                            label: {
                                rotate: { degrees: 270 },
                                renderer: function (v) {

                                    return -30 + v;
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            type: 'column',
                            axis: 'left',
                            gutter: 80,
                            xField: 'Index',
                            yField: ['GroundSpeed'],
                            tips: {
                                trackMouse: true,
                                width: 120,
                                height: 38,
                                renderer: function (storeItem, item) {
                                    this.setTitle("Index: " + storeItem.get('Index') + '<br/>Speed: ' + storeItem.get('GroundSpeed') + "");
                                }
                            },
                            style: {
                                fill: '#38B8BF'
                            }
                        }
                    ]
                }
            ]
        });

        DeviceCommunication.view.device.ImpactAlert2Window.superclass.initComponent.apply(this, arguments);
    }
});

DeviceCommunication.view.device.ImpactAlert2Window.prototype.view = function (impactArray2) {
    //console.log(Ext.encode(data));
    var gridpanel = this.items.get(0);
    gridpanel.store.loadData(impactArray2);
}