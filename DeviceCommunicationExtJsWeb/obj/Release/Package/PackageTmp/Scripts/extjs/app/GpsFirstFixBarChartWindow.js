Ext.define('GpsFirstFixBarChartWindow', {
    extend: 'Ext.Window',
    width: 1200,
    height: 500,
    minHeight: 400,
    minWidth: 500,
    hidden: false,
    //maximizable: true,
    title: 'Column Chart',
    renderTo: Ext.getBody(),
    //modal: true,
    layout: 'fit',

    items: {
        xtype: 'chart',
        animate: true,
        store: Ext.create('Ext.data.Store', {
            model: 'GpsFirstFix'
        }),
        axes: [{
            type: 'Numeric',
            position: 'left',
            fields: ['TimeToFirstFix'],
            title: 'TimeToFirstFix',
            grid: true,
            minimum: 0
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['Description'],
            title: 'Header Time(Local)',
            //grid: true,
            label: {
                rotate: {
                    degrees: 270
                }
            }
        }],
        series: [{
            type: 'column',
            axis: 'left',
            //highlight: true,
            tips: {
                trackMouse: true,
                width: 150,
                height: 50,
                renderer: function(storeItem, item) {
                    this.setTitle(storeItem.get('Description') + '<br />TimeToFirstFix - ' + storeItem.get('TimeToFirstFix') + '<br />Version - ' + storeItem.get('Version'));
                }
            },
            label: {
                display: 'insideEnd',
                'text-anchor': 'middle',
                field: 'TimeToFirstFix',
                renderer: Ext.util.Format.numberRenderer('0'),
                orientation: 'vertical',
                color: '#333'
            },
            xField: 'Description',
            yField: 'TimeToFirstFix'
        }]
    },
    doRefreshData: function (store) {
        this.items.get(0).store = store;
        store.load();
    }
});