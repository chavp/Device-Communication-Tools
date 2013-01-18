var timeAgoInWords = function (date) {
    try {
        var now = Math.ceil(Number(new Date()) / 1000),
            dateTime = Math.ceil(Number(new Date(date)) / 1000),
            diff = now - dateTime,
            str;

        if (diff < 60) {
            return String(diff) + ' seconds ago';
        } else if (diff < 3600) {
            str = String(Math.ceil(diff / (60)));
            return str + (str == "1" ? ' minute' : ' minutes') + ' ago';
        } else if (diff < 86400) {
            str = String(Math.ceil(diff / (3600)));
            return str + (str == "1" ? ' hour' : ' hours') + ' ago';
        } else if (diff < 60 * 60 * 24 * 365) {
            str = String(Math.ceil(diff / (60 * 60 * 24)));
            return str + (str == "1" ? ' day' : ' days') + ' ago';
        } else {
            return Ext.Date.format(new Date(date), 'jS M \'y');
        }
    } catch (e) {
        return '';
    }
}


Ext.application({
    name: 'Device Communication System',
    glossOnIcon: false,

    launch: function () {
        Ext.regModel('Device', {
            extend: 'Ext.data.Model',
            fields: ['Imei', 'IP', 'Firmware',
                { name: 'LatestAccessTime' },
                { name: 'LatestAccessDateTime', type: 'date', dateFormat: 'MS' },
                { name: 'CountMessages', type: 'int' },
                { name: 'VehicleState' },
                { name: 'Silent1State' },
                { name: 'ObdBlackoutState' },
                { name: 'MismatchVinState' },
                { name: 'ModeState' },
                { name: 'TcpHangingState' }
            ],
            idProperty: 'Imei'
        });

        Ext.regModel('Message', {
            extend: 'Ext.data.Model',
            fields: ['Imei', 'MessageType', 'Seq', 'Version', 'JouneyId',
            { name: 'HeaderTime', type: 'date', dateFormat: 'MS' },
            { name: 'CreatedTime', type: 'date', dateFormat: 'MS' },
            'PacketId',
            { name: 'CreateAt', type: 'date', dateFormat: 'MS'}],
            idProperty: 'PacketId'
        });

        Ext.regModel('Log', {
            extend: 'Ext.data.Model'
            , fields: [
                { name: 'TimeGenerated', type: 'date', dateFormat: 'MS' },
                'MessageType',
                'Seq',
                'HeaderTime',
                'AckCompleted',
                'WriteResponseElapsed',
                'ServerId',
                'ServerTime',
                'ResponseSeq',
                'StatusCode',
                'RequestId',
                'RequestCommand',
                'ResponseMsgType',
                'TimesOfRequstCommand',
                'DeviceAddress',
                'Encryption',
                'ErrorMessage',
                'PacketId']
        });

        var store = Ext.create('Ext.data.Store', {
            model: 'Device',
            autoLoad: true,
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url: 'Home/GellAllDevice',
                timeout: 120000,
                reader: {
                    type: 'json',
                    rootProperty: 'devices',
                    totalProperty: 'total',
                    successProperty: 'success'
                }
            }
        });

        var currentImei = null;

        var tab = Ext.create('Ext.tab.Panel', {
            items: [
                {
                    title: 'Device in System',
                    xtype: 'list',
                    ui: 'round',
                    id: 'device-list',
                    fullscreen: true,
                    store: store,
                    plugins: [
                        { xclass: 'Ext.plugin.ListPaging', autoPaging: false },
                        { xclass: 'Ext.plugin.PullRefresh' }
                    ],
                    itemTpl: Ext.create('Ext.XTemplate',
                        '<h4>{Imei}, Last message arrived: {[this.posted(values.LatestAccessDateTime)]}.</h4>',
                        {
                            posted: timeAgoInWords
                        }
                    ),
                    listeners: {
                        select: function (list, model) {
                            currentImei = model.get('Imei');
                            //                            if (model.get('selectable') === false) {
                            //                                list.deselect(model);
                            //                                return false;
                            //                            }
                            //                            this.down('titlebar').setTitle(value);
                        } // select
                    } // listeners
                },
                {
                    //title
                    title: 'Request Config & Command Pending',

                    //the items html
                    items: {
                        centered: true
                    }
                }
            ]
        });

        var msgBtn = Ext.create('Ext.Button', {
            iconMask: true, text: 'Messages', iconCls: 'search', ui: 'forward',
            align: 'right',
            hidden: false,
            hideAnimation: Ext.os.is.Android ? false : {
                type: 'fadeOut',
                duration: 200
            },
            showAnimation: Ext.os.is.Android ? false : {
                type: 'fadeIn',
                duration: 200
            },
            handler: function () {
                if (currentImei != null) {

                    msgBtn.hide();
                    logBtn.hide();

                    //msgList.title = 'Messages of ' + currentImei;

                    var msgStore = Ext.create('Ext.data.Store', {
                        model: 'Message',
                        autoLoad: true,
                        pageSize: 50,
                        proxy: {
                            type: 'ajax',
                            url: 'Home/Messages',
                            timeout: 120000,

                            extraParams: {
                                imei: currentImei
                            },

                            reader: {
                                type: 'json',
                                rootProperty: 'messages',
                                totalProperty: 'total',
                                successProperty: 'success'
                            }
                        }
                    });

                    navigationview.push({
                        xtype: 'list',
                        title: 'Messages of ' + currentImei,
                        store: msgStore,
                        ui: 'round',
                        plugins: [
                            { xclass: 'Ext.plugin.ListPaging', autoPaging: false },
                            { xclass: 'Ext.plugin.PullRefresh' }
                        ],
                        itemTpl: Ext.create('Ext.XTemplate',
                                '<div class="tweet">',
                                '<p><strong>SEQ:</strong> {Seq}</p>',
                                '<p><strong>Header Time(UTC):</strong> {HeaderTime:date("d/m/Y H:i:s")}</p>',
                                '<p><strong>Message Type:</strong> {MessageType}</p>',
                                '<p><strong>Jouney ID:</strong> {JouneyId}</p>',
                                '<p><strong>Created Time(Local):</strong> {CreatedTime:date("d/m/Y H:i:s")}</p>',
                                '<span class="posted">{[this.posted(values.CreateAt)]}</span>',
                                '</div>',
                                {
                                    posted: timeAgoInWords
                                }
                        ),
                        listeners: {
                            select: function (list, model) {

                            } // select
                        } // listeners
                    });

                    console.log(navigationview.getItems().length);
//                    msgStore.setProxy({
//                        type: 'ajax',
//                        url: 'Home/Messages?imei=' + currentImei,
//                        timeout: 120000,
//                        reader: {
//                            type: 'json',
//                            rootProperty: 'messages',
//                            totalProperty: 'total',
//                            successProperty: 'success'
//                        }
                    //                    });
//                    msgStore.getProxy().setExtraParam("imei",  currentImei);
//                    msgStore.load();
                }
            }
        });

        var logBtn = Ext.create('Ext.Button', {
            iconMask: true, text: 'Logs', iconCls: 'search', ui: 'forward',
            align: 'right',
            hidden: false,
            hideAnimation: Ext.os.is.Android ? false : {
                type: 'fadeOut',
                duration: 200
            },
            showAnimation: Ext.os.is.Android ? false : {
                type: 'fadeIn',
                duration: 200
            },
            handler: function () {
                if (currentImei != null) {
                    msgBtn.hide();
                    logBtn.hide();

                    var logStore = Ext.create('Ext.data.Store', {
                        model: 'Log',
                        autoLoad: true,
                        pageSize: 50,
                        proxy: {
                            type: 'ajax',
                            url: 'Home/Logs',
                            timeout: 120000,

                            extraParams: {
                                imei: currentImei
                            },

                            reader: {
                                type: 'json',
                                rootProperty: 'logs',
                                totalProperty: 'total',
                                successProperty: 'success'
                            }
                        }
                    });

                    navigationview.push({
                        xtype: 'list',
                        title: 'Logs of ' + currentImei,
                        store: logStore,
                        ui: 'round',
                        plugins: [
                            { xclass: 'Ext.plugin.ListPaging', autoPaging: false },
                            { xclass: 'Ext.plugin.PullRefresh' }
                        ],
                        itemTpl: Ext.create('Ext.XTemplate',
                            '<div class="tweet">',
                            '<p>Event Time(Local): {TimeGenerated:date("d/m/Y H:i:s")}</p>',
                            '<p>MSG Type: {MessageType}</p>',
                            '<p>SEQ: {Seq}</p>',
                            '<p>REQ ID: {RequestId}</p>',
                            '<p>RESP MSG Type: {ResponseMsgType}</p>',
                            '<span class="posted">{[this.posted(values.TimeGenerated)]}</span>',
                            '</div>',
                            {
                                posted: timeAgoInWords
                            }
                        ),
                        listeners: {
                            select: function (list, model) {

                            } // select
                        } // listeners
                    });
                }
            }
        });

        var navigationview = Ext.create('Ext.navigation.View',
        {
            fullscreen: true,
            autoDestroy: false,
            navigationBar: {
                docked: 'bottom',
                items: [msgBtn, logBtn]
            },
            items: tab,
            listeners: {
                back: function (v, opts) {
                    msgBtn.show();
                    logBtn.show();

                    console.log(navigationview.getItems().length);
                }
            }
        });

        console.log(navigationview.getItems().length);
    }
});