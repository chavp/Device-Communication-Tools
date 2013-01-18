Ext.define('DeviceCommunication.view.device.SimulationScriptWindow', {
    extend: 'Ext.window.Window',
    initComponent: function () {
        var messageSimStore = Ext.create('Ext.data.Store', {
            model: 'DeviceCommunication.model.MessageCode'
        });

        var me = this;
        var grid = {
            xtype: 'gridpanel',
            region: 'center',
            autoScroll: true,
            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dropGroup: 'firstGridDDGroup'
                },
                listeners: {
                    drop: function (node, data, dropRec, dropPosition) {
                        console.log("drop");
                    }
                }
            },
            store: messageSimStore,
            columns: [
                { text: 'SEQ', width: 50, sortable: false, dataIndex: 'Seq' },
                { text: 'HeaderTime(UTC)', width: 150, sortable: false, dataIndex: 'HeaderTime' },
                { text: 'Message Type', width: 200, sortable: false, dataIndex: 'MessageType', renderer: renderMsgColor, filter: true },
                { text: 'IMEI', width: 150, sortable: false, dataIndex: 'Imei', hidden: true },
                { text: 'CreatedTime(Local)', width: 150, sortable: false, dataIndex: 'CreatedTime' },
                { text: 'PacketId', width: 250, sortable: false, dataIndex: 'PacketId', hidden: true }
            ],
            tbar: [
                { xtype: 'button', text: 'Create',
                    handler: function (btn, evt) {
                        var packetIds = [];
                        for (var i = 0; i < messageSimStore.getCount(); i++) {
                            var model = messageSimStore.getAt(i);
                            //console.log(model.get("PacketId"));
                            packetIds.push({ packetId: model.get("PacketId") });
                        }
                        //console.log(window.BaseUrl);
                        //console.log(Ext.encode(packetIds));
                        if (packetIds.length > 0) {
                            btn.setDisabled(true);
                            $.ajax({
                                type: 'POST',
                                url: window.BaseUrl + 'Devices/BuildSimulationScript',
                                data: Ext.encode({ packets: packetIds }),
                                success: function (result) {
                                    btn.setDisabled(false);
                                    console.log(result.script);
                                    window.open(result.script);

                                    me.close();
                                    //console.log(result.script);
                                    //$.get(result.script);
                                },
                                error: function (xhr, ajaxOptions, thrownError) {
                                    alert(xhr.status + " " + thrownError);
                                    btn.setDisabled(false);
                                },
                                contentType: "application/json; charset=utf-8",
                                dataType: 'json'
                            });
                        }
                    }
                },
                { xtype: 'button', text: 'Reset',
                    handler: function (btn, evt) {
                        messageSimStore.removeAll();
                    }
                }
            ]
        };

        Ext.apply(this, {
            width: 600,
            height: 500,
            title: 'Simulation Script Builder',
            layout: 'border',
            items: [grid]
        });

        DeviceCommunication.view.device.SimulationScriptWindow.superclass.initComponent.apply(this, arguments);
    }
});