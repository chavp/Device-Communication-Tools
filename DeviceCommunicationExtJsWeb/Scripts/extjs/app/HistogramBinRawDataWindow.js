Ext.define('HistogramBinRawDataWindow', {
    extend: 'Ext.Window',

    initComponent: function () {

        var store = Ext.create('Ext.data.Store', {
            model: 'BinRawData',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'Episodes'
                }
            }
        });

        Ext.apply(this, {
            title: 'Histogram',
            width: 1200,
            height: 700,
            layout: { type: 'border', padding: 5 },
            defaults: { split: true },
            items: [{
                xtype: 'panel',
                title: 'HistogramBinRawData',
                region: 'center',
                layout: { type: 'border', padding: 5 },
                defaults: { split: true },
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
                    xtype: 'gridpanel',
                    title: 'RawData',
                    region: 'south',
                    height: 250,
                    store: store,
                    columns: [
                        { dataIndex: 'Index', text: 'Index', width: 50, sortable: false, align: 'right' },
                        { dataIndex: 'Data', text: 'Value', width: 120, sortable: false, align: 'right' }
                    ]
                }, {
                    xtype: 'fieldset',
                    title: 'HistogramInfo',
                    region: 'north',
                    height: 180,
                    defaultType: 'textfield',
                    layout: { type: 'vbox', align: 'stretch' },
                    defaults: { labelWidth: 200, readOnly: true },
                    items: [// - 0
                        {fieldLabel: 'Seq', name: 'Seq'}, // - 0
                        {fieldLabel: 'Header Time(UTC)', name: 'HeaderTime' }, // - 1
                        {fieldLabel: 'Version', name: 'Version' }, // - 2
                        {fieldLabel: 'UniquedIdNumberForHistogram', name: 'UniquedIdNumberForHistogram' }, // - 3
                        {fieldLabel: 'HistogramBinDefinitionIndexKey', name: 'HistogramBinDefinitionIndexKey' }, // - 4
                        {fieldLabel: 'RawBinSize', name: 'RawBinSize'} // - 5
                    ]
                }]
            },
            {
                xtype: 'chart',
                title: 'HistogramBinRawData Charts',
                region: 'east',
                layout: 'fit',
                width: 800,
                height: 500,
                animate: true,
                shadow: true,
                store: store,
                axes: [{
                    type: 'Numeric',
                    position: 'left',
                    fields: ['Data'],
                    title: 'Data',
                    grid: true,
                    minimum: -32800,
                    maximum: 32800
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
                    type: 'column',
                    axis: 'left',
                    highlight: true,
                    xField: 'Index',
                    yField: ['Data'],
                    tips: {
                        trackMouse: true,
                        width: 100,
                        height: 38,
                        renderer: function (storeItem, item) {
                            this.setTitle("Index: " + storeItem.get('Index') + '<br />Value: ' + storeItem.get('Data'));
                        }
                    },
                    style: {
                        fill: '#38B8BF'
                    },
                    highlightCfg: {
                        fill: '#a2b5ca'
                    },
                    label: {
                        contrast: true,
                        display: 'insideEnd',
                        field: 'Data',
                        color: '#000',
                        orientation: 'vertical',
                        'text-anchor': 'middle'
                    }
                }]//end series
            }]
        });

        HistogramBinRawDataWindow.superclass.initComponent.apply(this, arguments);
    }
});


HistogramBinRawDataWindow.prototype.view = function (header, raw_data) {
    //console.log(Ext.encode(data));
    var gridpanel = this.items.get(0).items.get(1);
    gridpanel.store.loadData(raw_data);

    //-> /Date(1326683391000)/

    var ticks = header.HeaderTime.replace("/Date(", "").replace(")/", "");
    var date = new Date();
    date.setTime(ticks);

    var fieldcontainer = this.items.get(0).items.get(0);
    fieldcontainer.items.get(0).setValue(header.Seq);
    fieldcontainer.items.get(1).setValue(date.format('dd/mm/yyyy HH:MM:ss'));
    fieldcontainer.items.get(2).setValue(header.Version);
    fieldcontainer.items.get(3).setValue(header.UniquedIdNumberForHistogram);
    fieldcontainer.items.get(4).setValue(header.SequenceCounterForFragmentation);

    //console.log(fieldcontainer.xtype);
}