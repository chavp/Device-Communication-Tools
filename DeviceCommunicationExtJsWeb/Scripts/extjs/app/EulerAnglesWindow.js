
Ext.define('EulerAnglesWindow', {
    extend: 'Ext.Window',
    initComponent: function () {

        var store = Ext.create('Ext.data.JsonStore',
        {
            model: 'EulerAngles',
            autoLoad: true,
            sorters: [{ property: 'Index' }],
            groupField: 'HeaderTime',
            pageSize: 10,
            proxy: {
                type: 'ajax',
                //api: { read: getJourneyBasisAction },
                reader: {
                    type: 'json',
                    root: 'data',
                    totalProperty: 'total'
                }//end proxy
            }
        });

        Ext.apply(this, {
            width: 1200,
            minWidth: 500,

            height: 800,
            minHeight: 400,
            title: 'Euler Angles',
            layout: 'border',

            defaults: {
                split: true
            },
            items: [
                {
                    xtype: 'gridpanel',
                    region: 'center',
                    autoScroll: true,
                    loadMask: false,
                    columnLines: true,
                    disableSelection: true,
                    invalidateScrollerOnRefresh: true,
                    features: [Ext.create('Ext.grid.feature.Grouping', {
                        groupHeaderTpl: 'Header Time - {[Ext.util.Format.date(values.name, "d/m/Y H:i:s")]} ({rows.length} Row{[values.rows.length > 1 ? "s" : ""]})',
                        enableGroupingMenu: false
                    })],
                    store: store,
                    columns: [
                        { dataIndex: 'Index', text: 'Index', width: 50, sortable: false },
                        { dataIndex: 'Seq', text: 'SEQ', width: 50, sortable: false },
                        { dataIndex: 'SubSeq', text: 'SUB-SEQ', width: 50, sortable: false },
                        { dataIndex: 'HeaderTime', text: 'HeaderTime', width: 120, sortable: false, renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s') },
                        { dataIndex: 'EPsi', text: 'E-Psi', width: 50, sortable: false, align: 'right' },
                        { dataIndex: 'MPsi', text: 'M-Psi', width: 50, sortable: false, align: 'right' },
                        { dataIndex: 'ETheta', text: 'E-Theta', width: 50, sortable: false, align: 'right' },
                        { dataIndex: 'MTheta', text: 'M-Theta', width: 50, sortable: false, align: 'right' },
                        { dataIndex: 'EPhi', text: 'E-Phi', width: 50, sortable: false, align: 'right' },
                        { dataIndex: 'MPhi', text: 'M-Phi', width: 50, sortable: false, align: 'right' },
                        { dataIndex: 'TPsi', text: 'T-Psi', width: 50, sortable: false, align: 'right' },
                        { dataIndex: 'TTheta', text: 'T-Theta', width: 50, sortable: false, align: 'right' },
                        { dataIndex: 'TPhi', text: 'T-Phi', width: 50, sortable: false, align: 'right' }
                    ],
                    bbar: Ext.create('Ext.PagingToolbar', {
                        store: store,
                        displayInfo: true,
                        displayMsg: 'Displaying Euler Angles Array{0} - {1} of {2}',
                        emptyMsg: "No Euler Angles Array to display"
                    })
                }, //end gridpanel, center
                {
                    region: 'east',
                    layout: 'border',
                    width: 650,
                    defaults: {split: true},
                    items: [{
                            xtype: 'chart',
                            region: 'center',
                            store: store,
                            animate: true,
                            layout: 'fit',
                            legend: {position: 'top'},
                            axes: [{
                                type: 'Numeric',
                                maximum: 180,
                                minimum: -270,
                                position: 'left',
                                fields: ['EPsi', 'MPsi', 'ETheta', 'MTheta', 'EPhi', 'MPhi'],
                                title: 'Euler Angle',
                                minorTickSteps: 1,
                                grid: {
                                        odd: {opacity: 1, fill: '#ddd', stroke: '#bbb', 'stroke-width': 0.5
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
                            }], //end axes
                            series: [{
                                type: 'line',
                                highlight: {size: 5, radius: 5},
                                axis: 'left',
                                smooth: true,
                                xField: 'Index',
                                yField: 'EPsi',
                                markerConfig: { type: 'circle', size: 2, radius: 2, 'stroke-width': 0 },
                                tips: {
                                    trackMouse: true,
                                    width: 100, height: 40,
                                    renderer: function (storeItem, item) {
                                        this.setTitle("Index:" + storeItem.get('Index') + '<br/> E-Psi:' + storeItem.get('EPsi'));
                                    }
                                }
                            }, //end EPsi line
                            {
                                type: 'line',
                                axis: 'left',
                                smooth: true,
                                xField: 'Index',
                                yField: 'MPsi',
                                markerConfig: { type: 'cross', size: 0, radius: 0, 'stroke-width': 0 }
                            }, //end MPsi line
                            {
                                type: 'line',
                                highlight: {size: 5,radius: 5},
                                axis: 'left',
                                smooth: true,
                                xField: 'Index',
                                yField: 'ETheta',
                                markerConfig: { type: 'circle', size: 2, radius: 2, 'stroke-width': 0 },
                                tips: {
                                    trackMouse: true,
                                    width: 100, height: 40,
                                    renderer: function (storeItem, item) {
                                        this.setTitle("Index:" + storeItem.get('Index') + '<br/> E-Theta:' + storeItem.get('ETheta'));
                                    }
                                }
                            }, //end ETheta
                            {
                                type: 'line',
                                axis: 'left',
                                smooth: true,
                                xField: 'Index',
                                yField: 'MTheta',
                                markerConfig: { type: 'cross', size: 0, radius: 0, 'stroke-width': 0 }
                            }, //end MTheta
                            {
                                type: 'line',
                                highlight: {size: 5,radius: 5},
                                axis: 'left',
                                smooth: true,
                                xField: 'Index',
                                yField: 'EPhi',
                                markerConfig: { type: 'circle', size: 2, radius: 2, 'stroke-width': 0 },
                                tips: {
                                    trackMouse: true,
                                    width: 100, height: 40,
                                    renderer: function (storeItem, item) {
                                        this.setTitle("Index:" + storeItem.get('Index') + '<br/> E-Phi:' + storeItem.get('EPhi'));
                                    }
                                }
                            }, //end EPhi
                            {
                                type: 'line',
                                axis: 'left',
                                smooth: true,
                                xField: 'Index',
                                yField: 'MPhi',
                                markerConfig: { type: 'cross', size: 0, radius: 0, 'stroke-width': 0 }
                            } //end MPhi
                            ]//end series
                        }, //end chart
                        {
                            region: 'south',
                            xtype: 'chart',
                            
                            height: 300,
                            store: store,
                            animate: true,
                            layout: 'fit',
                            legend: { position: 'top' },
                            axes: [{
                                type: 'Numeric',
                                maximum: 100,
                                minimum: 0,
                                position: 'left',
                                fields: ['TPsi', 'TTheta'],
                                title: 'Temperature',
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
                            }], //end axes
                            series: [{
                                type: 'line',
                                highlight: { size: 7, radius: 7 },
                                axis: 'left',
                                smooth: true,
                                xField: 'Index',
                                yField: 'TPsi',
                                markerConfig: { type: 'circle', size: 2, radius: 2, 'stroke-width': 0 },
                                tips: {
                                    trackMouse: true,
                                    width: 100, height: 40,
                                    renderer: function (storeItem, item) {
                                        this.setTitle("Index:" + storeItem.get('Index') + '<br/> T-Psi:' + storeItem.get('TPsi'));
                                    }
                                }
                            }, {
                                type: 'line',
                                highlight: { size: 7, radius: 7 },
                                axis: 'left',
                                smooth: true,
                                xField: 'Index',
                                yField: 'TTheta',
                                markerConfig: { type: 'circle', size: 2, radius: 2, 'stroke-width': 0 },
                                tips: {
                                    trackMouse: true,
                                    width: 100, height: 40,
                                    renderer: function (storeItem, item) {
                                        this.setTitle("Index:" + storeItem.get('Index') + '<br/> T-Theta:' + storeItem.get('TTheta'));
                                    }
                                }
                            }]//end series
                        }//end items chart
                    ]
                }//east
            ]//end items
        });

        JourneyBasisWindow.superclass.initComponent.apply(this, arguments);
    }
});

EulerAnglesWindow.prototype.getEulerAnglesGrid = function () {
    return this.items.get(0);
}

EulerAnglesWindow.prototype.doRefreshData = function (url) {
    this.getEulerAnglesGrid().store.proxy.url = url;
    //this.getEulerAnglesGrid().store.load();
}

