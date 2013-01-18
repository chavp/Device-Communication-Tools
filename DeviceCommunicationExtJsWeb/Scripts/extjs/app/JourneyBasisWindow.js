Ext.define('JourneyBasisWindow', {
    extend: 'Ext.Window',
    initComponent: function () {
        Ext.apply(this, {
            width: 1200,
            height: 550,
            minHeight: 400,
            minWidth: 500,
            maxHeight: 700,
            maxWidth: 1000,
            title: 'Journey Basis',
            layout: 'border',
            defaults: {
                split: true
            },
            items: [
                {
                    xtype: 'gridpanel',
                    region: 'center',
                    store: Ext.create('Ext.data.JsonStore', {
                        model: 'JourneyBasis',
                        proxy: {
                            type: 'ajax',
                            //api: { read: getJourneyBasisAction },
                            reader: {
                                type: 'json',
                                root: 'data',
                                totalProperty: 'total'
                            }
                        }
                    }),
                    columns: [
                        { dataIndex: 'JourneyId', text: 'JNEY ID', width: 50, sortable: false },
                        { dataIndex: 'StartJourney', text: 'Start Journey(Local)', width: 120, sortable: false, renderer: Ext.util.Format.dateRenderer('d/m/Y H:i') },
                        { dataIndex: 'StopJourney', text: 'Stop Journey(Local)', width: 120, sortable: false, renderer: Ext.util.Format.dateRenderer('d/m/Y H:i') },
                        { dataIndex: 'JneyDuration', text: 'JNEY Duration', width: 100, sortable: false, align: 'right' },
                        { dataIndex: 'DrivingDuration', text: 'Driving Duration(Summary)', width: 150, sortable: false, align: 'right' },
                        { dataIndex: 'IdlingDuration', text: 'Idling Duration(Summary)', width: 150, sortable: false, align: 'right' },
                        { dataIndex: 'HavDistanceFromGeopointsMeter', text: 'Hav Distance(Meter)', width: 110, sortable: false, align: 'right' },
                        { dataIndex: 'HavDistanceMeter', text: 'Partial Hav Distance(Meter)', width: 120, sortable: false, align: 'right' }
                    ]
                }//end gridpanel, center
            ]//end items
        });

        JourneyBasisWindow.superclass.initComponent.apply(this, arguments);
    }
});

JourneyBasisWindow.prototype.getJneybasisGrid = function () {
    return this.items.get(0);
}

JourneyBasisWindow.prototype.doRefreshData = function (url) {
    this.getJneybasisGrid().store.proxy.url = url;
    this.getJneybasisGrid().store.load();
}

JourneyBasisWindow.prototype.setTitle = function (title) {
    this.title = title;
}
