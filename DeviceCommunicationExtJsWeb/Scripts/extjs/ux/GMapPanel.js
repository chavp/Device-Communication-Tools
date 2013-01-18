/**
* @class Ext.ux.GMapPanel
* @extends Ext.Panel
* @author Shea Frederick
*/
Ext.define('Ext.ux.GMapPanel', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.gmappanel',

    requires: ['Ext.window.MessageBox'],

    initComponent: function () {

        this.markers = [];

        Ext.applyIf(this, {
            plain: true,
            gmapType: 'map',
            border: false
        });

        this.callParent();
    },

    afterFirstLayout: function () {
        var center = this.center;
        this.callParent();

        if (center) {
            if (center.geoCodeAddr) {
                this.lookupCode(center.geoCodeAddr, center.marker);
            } else {
                this.createMap(center);
            }
        } else {
            Ext.Error.raise('center is required');
        }

    },

    createMap: function (center, marker) {
        options = Ext.apply({}, this.mapOptions);
        options = Ext.applyIf(options, {
            zoom: 16,
            center: center,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        this.gmap = new google.maps.Map(this.body.dom, options);
        if (marker) {
            this.addMarker(Ext.applyIf(marker, {
                position: center
            }));
        }

        Ext.each(this.markers, this.addMarker, this);
    },
    getMap: function () {
        return this.gmap;
    },
    getCenter: function () {
        return this.getMap().getCenter();
    },
    getCenterLatLng: function () {
        var ll = this.getCenter();
        return { lat: ll.lat(), lng: ll.lng() };
    },
    addMarker: function (marker, radius) {

        marker = Ext.apply({
            map: this.gmap
        }, marker);

        if (!marker.position) {
            marker.position = new google.maps.LatLng(marker.lat, marker.lng);
        }
        var o = new google.maps.Marker(marker);
        Ext.Object.each(marker.listeners, function (name, fn) {
            google.maps.event.addListener(o, name, fn);
        });

        this.markers.push(o);

        if (radius != null) {
            //console.log("Cycle:" + geoFenceRadius);
            if (marker.TotalNear == marker.MaxTotalNear) {
                o.cycle = new google.maps.Circle({
                    center: marker.position,
                    radius: radius,
                    strokeWeight: 1,
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.5,
                    fillOpacity: 0.0,
                    map: this.gmap
                });
            }
        }
        return o;
    },
    removeAllMarker: function () {
        //console.log(this.markers.length);
        this.markers.forEach(function (marker) {
            //console.log(marker.setMap);
            marker.setMap(null);
            if (marker.cycle) {
                marker.cycle.setMap(null);
            }
        });

        this.markers = [];
        //console.log(this.markers.length);
    },
    lookupCode: function (addr, marker) {
        this.geocoder = new google.maps.Geocoder();
        this.geocoder.geocode({
            address: addr
        }, Ext.Function.bind(this.onLookupComplete, this, [marker], true));
    },

    onLookupComplete: function (data, response, marker) {
        if (response != 'OK') {
            Ext.MessageBox.alert('Error', 'An error occured: "' + response + '"');
            return;
        }
        this.createMap(data[0].geometry.location, marker);
    },

    afterComponentLayout: function (w, h) {
        this.callParent(arguments);
        this.redraw();
    },

    redraw: function () {
        var map = this.gmap;
        if (map) {
            google.maps.event.trigger(map, 'resize');
        }
    }

});