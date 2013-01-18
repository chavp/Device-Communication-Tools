
Ext.define('DeviceCommunication.view.device.DailyBasisWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.dailybasiswindow',

    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            width: 1200,
            height: 700,
            title: 'Daily Basis',
            layout: 'border',
            defaults: { split: true },
            modal: false,
            iconCls: 'icon-details',
            items: [
                {
                    xtype: 'gridpanel',
                    region: 'center',
                    id: 'daily-basis-list',
                    store: Ext.create('Ext.data.JsonStore', {
                        model: 'DeviceCommunication.model.DailyBasis',
                        proxy: {
                            type: 'ajax',
                            api: { read: window.BaseUrl + "Devices/GetDailyBasis" },
                            timeout: 120000,
                            reader: {
                                type: 'json',
                                root: 'data',
                                totalProperty: 'total'
                            }
                        }
                    }),
                    columns: [
                        { dataIndex: 'Version', text: 'Ver.', width: 50, sortable: false, align: 'center' },
                        { dataIndex: 'Imei', sortable: false, hidden: true },
                        { dataIndex: 'DeviceSN', text: 'Device SN', width: 160, sortable: false },
                        { dataIndex: 'ForDate', text: 'For Date', width: 80, sortable: false, renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                        { dataIndex: 'HavDistanceFromGeopointsMeter', text: 'Server Hav Distance(M)', width: 90, sortable: false, align: 'right' },
                        { dataIndex: 'TotalOfGeopoint', text: 'Total Geopoint', width: 90, sortable: false, align: 'right' },
                        { dataIndex: 'MeterPerGeopoint', text: 'Meter/Geopoint', width: 90, sortable: false, align: 'right' }
                    ],
                    listeners: {
                        selectionchange: function (model, records) {
                            if (records[0]) {
                                var imei = records[0].get('Imei');
                                var forDate = records[0].get('ForDate');
                                var data = {};
                                data.Imei = imei;
                                data.forDate = forDate;
                                //console.log(forDate);

                                $.ajax({
                                    type: "POST",
                                    cache: false,
                                    data: Ext.encode(data),
                                    //async: false,
                                    url: window.GetGeopoints,
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    success: function (result) {
                                        //console.log(result.data);
                                        var googleMap = Ext.getCmp('google-map');
                                        googleMap.removeAllMarker();
                                        result.data.forEach(function (geopoint) {
                                            //console.log(geopoint.Latitude);
                                            var seq = geopoint.Seq;
                                            var lat = geopoint.Latitude;
                                            var lng = geopoint.Longitude;
                                            var heading = geopoint.Heading;
                                            var totalNear = geopoint.TotalNear;
                                            var maxTotalNear = geopoint.MaxTotalNear;
                                            var latlng = new google.maps.LatLng(lat, lng);
                                            var mark = new google.maps.Marker(
                                                {
                                                    position: latlng,
                                                    title: "Seq:" + seq + ", Geopoint:(" + lat + ", " + lng + "), Near: " + totalNear + " (200m)"
                                                }
                                            );

                                            mark.TotalNear = totalNear;
                                            mark.MaxTotalNear = maxTotalNear;

                                            if (heading >= 338 || heading < 23) {
                                                mark.icon = window.direction_up_icon;
                                            }
                                            else if (23 <= heading && heading < 68) {
                                                mark.icon = window.direction_upright_icon;
                                            }
                                            else if (68 <= heading && heading < 113) {
                                                mark.icon = window.direction_right_icon;
                                            }
                                            else if (113 <= heading && heading < 158) {
                                                mark.icon = window.direction_downright_icon;
                                            }
                                            else if (158 <= heading && heading < 203) {
                                                mark.icon = window.direction_down_icon;
                                            }
                                            else if (203 <= heading && heading < 248) {
                                                mark.icon = window.direction_downleft_icon;
                                            }
                                            else if (248 <= heading && heading < 293) {
                                                mark.icon = window.direction_left_icon;
                                            }
                                            else if (293 <= heading && heading < 338) {
                                                mark.icon = window.direction_upleft_icon;
                                            }

                                            mark.size = new google.maps.Size(22, 20);
                                            googleMap.addMarker(mark, 200);
                                            googleMap.getMap().panTo(latlng);
                                        });
                                    },
                                    error: function (xhr, ajaxOptions, thrownError) {
                                        Ext.MessageBox.hide();
                                        alert(xhr.status + " " + thrownError);
                                    }
                                }); //end ajax
                            }
                        }
                    }
                }//end gridpanel, center
                , {
                    xtype: 'gmappanel',
                    width: 600,
                    region: 'east',
                    zoomLevel: 16,
                    id: 'google-map',
                    center: {
                        geoCodeAddr: 'CarPass, TH',
                        marker: { title: 'บริษัท คาร์พาส อินฟอร์เมชั่น เซอร์วิสเซส จำกัด' }
                    }
                }
            ]
        });

        DeviceCommunication.view.device.DailyBasisWindow.superclass.initComponent.apply(this, arguments);
    },
    getDailybasisGrid: function () {
        return this.items.get(0);
    },
    doRefreshData: function (imei) {
        this.getDailybasisGrid().store.getProxy().extraParams.imei = imei;
        this.getDailybasisGrid().store.load();
    }
});