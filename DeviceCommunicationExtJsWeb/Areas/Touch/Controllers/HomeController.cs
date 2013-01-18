using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using CarPass.Domains.Communications.Repositories;
using CarPass.Repositories.Documents;

using DeviceCommunicationExtJsWeb.Models;
using CarPass.Domains.Communications.Messages;
using CarPass.Domains.Communications.Messages.Extensions;
using System.Diagnostics;

namespace DeviceCommunicationExtJsWeb.Areas.Touch.Controllers
{
    public class HomeController : Controller
    {
        public IDeviceRepository DeviceRepository { get; set; }
        public IDeviceStateDocuments DeviceStateDocuments { get; set; }
        public IPacketRepository PacketRepository { get; set; }

        public ILogDocuments LogDocuments { get; set; }

        public HomeController(IDeviceRepository deviceRepository,
            IPacketRepository packetRepository,
            IDeviceStateDocuments deviceStateDocuments,
            ILogDocuments logDocuments)
        {
            DeviceRepository = deviceRepository;
            PacketRepository = packetRepository;

            DeviceStateDocuments = deviceStateDocuments;
            LogDocuments = logDocuments;
        }

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GellAllDevice(int start, int limit)
        {
            var results = DeviceRepository.GetAll();
            int total = results.Count;
            var devices = results.ToDeviceModels();
            devices.Sort((x, y) =>
            {
                return y.Imei.CompareTo(x.Imei);
            });

            devices = devices.Skip(start).Take(limit).ToList();

            //var listOfDeviceState = DeviceStateDocuments.GetAll();

            devices.ForEach(d =>
            {
                var deviceState = DeviceStateDocuments.GetByImei(d.Imei);

                if (deviceState != null)
                {
                    d.CountMessages = deviceState.CountMessages;
                    if (!string.IsNullOrEmpty(deviceState.LatestPacketId))
                    {
                        var latestPacket = PacketRepository.GetByPacketId(deviceState.LatestPacketId);
                        d.Firmware = latestPacket.Version.ToString();
                        d.VehicleState = deviceState.VehicleState;
                        d.ModeState = deviceState.ModeState;
                        d.Silent1State = deviceState.Silent1State;
                        d.ObdBlackoutState = deviceState.ObdBlackoutState;
                        d.MismatchVinState = deviceState.MismatchVinState;
                        d.TcpHangingState = deviceState.TcpHangingState;
                    }
                }
            });

            return Json(
                new { devices = devices, total = total, success = true },
                JsonRequestBehavior.AllowGet);

        }

        public JsonResult Messages(string imei, int start, int limit)
        {
            List<Packet> packetList = new List<Packet>();
            int total = 0;

            var packet = PacketRepository.GetPacketByImei(imei, start, limit);
            packetList.AddRange(packet);
            total = PacketRepository.CountPacketByImei(imei);

            List<Message> msgList = new List<Message>();
            packetList.ForEach(pk =>
            {
                msgList.Add(pk.ToMessage());
            });

            msgList.Sort((x, y) =>
            {
                long numY = y.Seq + y.HeaderTime.Ticks;
                long numX = x.Seq + x.HeaderTime.Ticks;
                return numY.CompareTo(numX);
            });

            var msgModels = msgList.ToMessageModels();

            return Json(
                new { messages = msgModels.ToList(), total = total },
                JsonRequestBehavior.AllowGet);
        }

        public JsonResult Logs(string imei, int start, int limit)
        {
            var request = this.HttpContext.Request;
            //filter[0][field]:MessageType
            string filter_field = request["filter[0][field]"];
            //filter[0][data][type]:string
            string filter_data_type = request["filter[0][data][type]"];

            //filter[0][data][value]:GeoPoint
            string filter_data_value = request["filter[0][data][value]"];

            List<Log> currentEntrys = new List<Log>();
            int total = 0;
            try
            {
                //var page = (from ev in eventlog.Entries.Cast<EventLogEntry>()
                //            where ev.Message.Contains(imei)
                //            && !ev.Message.Contains("Spring")
                //            select ev);

                var page = LogDocuments.GetByImei(imei, start, limit);
                total = LogDocuments.CountByImei(imei);

                foreach (var e in page)
                {
                    var l = new Log
                    {
                        TimeGenerated = e.timestamp,
                        Message = e.message
                        .Replace("[CarPass.Domains.Communications.Udp.UdpReceiveListener]", "")
                        .Replace("[CarPass.Domains.Communications.Tcp.DeviceCommunicationTcpServiceProvider]", ""),
                        //EntryType = e.EntryType.ToString(),
                        //Source = e.Source,
                    };
                    currentEntrys.Add(l);
                }

                //currentEntrys = currentEntrys.Where(e => e.Message.Contains(imei)).ToList();
                //currentEntrys = currentEntrys.Where(e => !e.Message.Contains("Spring")).ToList();
                //currentEntrys.OrderByDescending( c => c.TimeGenerated);

                currentEntrys.ForEach(log =>
                {
                    log.ParseMessageLog();
                });

                //Filter
                if (!string.IsNullOrEmpty(filter_data_value))
                {
                    currentEntrys = currentEntrys.Where(log => log.MessageType.StartsWith(filter_data_value))
                        .ToList();
                }
            }
            catch (Exception ex)
            {
                currentEntrys.Add(new Log
                {
                    TimeGenerated = DateTime.Now,
                    MessageType = "Exception",
                    Seq = "NA",
                    HeaderTime = DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss"),
                    ErrorMessage = ex.Message,
                });

                total = 1;
            }

            return Json(
                new { logs = currentEntrys, total = total },
                JsonRequestBehavior.AllowGet);
        }
    }
}
