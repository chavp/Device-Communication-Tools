Ext.define('DeviceCommunication.view.device.JourneySummaryWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.journeysummarywindow',

    initComponent: function () {

        var me = this;

        var store = Ext.create('Ext.data.Store', {
            model: 'DeviceCommunication.model.JourneySummary',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            }
        });

        me.store = store;

        var drValueChart = {
            xtype: 'chart',
            region: 'center',
            store: store,
            title: "DrValue",
            axes: [{// - 0
                type: 'Numeric', position: 'left', fields: ['DrValue'], title: 'Dr Value', minimum: 0, grid: true,
                label: {
                    renderer: function (v) {
                        return Ext.util.Format.number(v, '0.0000');
                    }
                },
                minorTickSteps: 5,
                maximum: 1.7, minimum: 0
            }, {// - 1
                type: 'Category',
                position: 'bottom',
                fields: ['JourneyId'],
                title: 'Journey Summary ID (50 latest)',
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
                xField: 'JourneyId',
                yField: ['DrValue'],
                tips: {
                    trackMouse: true,
                    width: 220,
                    height: 60,
                    renderer: function (storeItem, item) {
                        this.setTitle("SEQ: " + storeItem.get('Seq') + "<br />JourneyId: " + storeItem.get('JourneyId') + '<br />DrValue: ' + storeItem.get('DrValue'));
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
                    field: 'DrValue',
                    color: '#000',
                    orientation: 'vertical',
                    'text-anchor': 'middle',
                    renderer: function (v) {
                        if (v == null) return "NA";
                        return Ext.util.Format.number(v, '0.0000');
                    }
                }
            }]//end series
        };
        me.drValueChart = drValueChart;

        var drStandardDeviationChart = {
            xtype: 'chart',
            region: 'south',
            height: 350,
            store: store,
            title: "DrStandardDeviation",
            
            axes: [{// - 0
                type: 'Numeric', position: 'left', fields: ['DrStandardDeviation'], title: 'Dr Standard Deviation', minimum: 0, grid: true,
                label: {
                    renderer: function (v) {
                        return Ext.util.Format.number(v, '0.0000');
                    }
                },
                minorTickSteps: 5,
                maximum: 1.7, minimum: 0
            }, {// - 1
                type: 'Category',
                position: 'bottom',
                fields: ['JourneyId'],
                title: 'Journey Summary ID (50 latest)',
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
                xField: 'JourneyId',
                yField: ['DrStandardDeviation'],
                tips: {
                    trackMouse: true,
                    width: 220,
                    height: 60,
                    renderer: function (storeItem, item) {
                        this.setTitle("SEQ: " + storeItem.get('Seq') + "<br />JourneyId: " + storeItem.get('JourneyId') + '<br />DrStandardDeviation: ' + storeItem.get('DrStandardDeviation'));
                    }
                },
                style: { fill: '#38B8BF' },
                //                highlightCfg: {
                //                    fill: '#a2b5ca'
                //                },
                label: {
                    contrast: true,
                    display: 'insideEnd',
                    field: 'DrStandardDeviation',
                    color: '#000',
                    orientation: 'vertical',
                    'text-anchor': 'middle',
                    renderer: function (v) {
                        if (v == null) return "NA";
                        return Ext.util.Format.number(v, '0.0000');
                    }
                }
            }]//end series
        };
        me.drStandardDeviationChart = drStandardDeviationChart;

        Ext.apply(this, {
            width: 1000,
            height: 700,
            title: 'Column Chart',
            layout: 'border',
            defaults: { split: true },
            iconCls: 'icon-chart',
            items: [drValueChart, drStandardDeviationChart]
        });

        DeviceCommunication.view.device.JourneySummaryWindow.superclass.initComponent.apply(this, arguments);
    }
});

DeviceCommunication.view.device.JourneySummaryWindow.prototype.view = function (data) {
    this.store.loadData(data);

}


DeviceCommunication.view.device.JourneySummaryWindow.prototype.createColor = function (imei) {
    var c = "#97df96";
    var v = parseInt(imei);
    if (v % 2 != 0)
        c = "#df9696";
    //console.log(c);
    this.drStandardDeviationChart.series[0].style.fill = c;
    this.drValueChart.series[0].style.fill = c;
    //console.log(this.drStandardDeviationChart);
}