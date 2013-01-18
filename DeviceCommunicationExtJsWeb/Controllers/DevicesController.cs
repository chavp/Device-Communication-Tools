using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using DeviceCommunicationExtJsWeb.Models;

using CarPass.Domains.Communications.Messages;
using CarPass.Domains.Communications.Messages.Extensions;

using CarPass.Domains.Communications.Repositories;
using CarPass.Repositories.Documents;

using DeviceCommunicationExtJsWeb.DeviceService;
using System.Diagnostics;
using System.Xml.Serialization;
using System.IO;
using CarPass.Domains.Communications.ValueObjects;
using CarPass.Domains.Communications.Agents;
using System.Text;
using CarPass.Domains.Communications;

using DeviceCommunicationExtJsWeb.Properties;

using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;


namespace DeviceCommunicationExtJsWeb.Controllers
{
    public class DevicesController : Controller
    {
        public IDeviceRepository DeviceRepository { get; set; }
        public IPacketRepository PacketRepository { get; set; }
        public IEventRepository EventRepository { get; set; }
        public ICurrentEventRepository CurrentEventRepository { get; set; }
        public IRequstAckCommandRepository RequstAckCommandRepository { get; set; }
        public ICacheDataRepository CacheDataRepository { get; set; }

        public IDeviceCommunicationService DeviceCommunicationService { get; set; }

        public DeviceCommunicationExtJsWeb.GpsCommunicationService.IGpsCommunicationContract GpsCommunicationContract { get; set; }

        public IDeviceStateDocuments DeviceStateDocuments { get; set; }

        public IDailyMileageRepository DailyMileageRepository { get; set; }
        public IGeoPointRepository GeoPointRepository { get; set; }

        public ILogDocuments LogDocuments { get; set; }

        public DevicesController(
            IDeviceCommunicationService deviceCommunicationService,
            DeviceCommunicationExtJsWeb.GpsCommunicationService.IGpsCommunicationContract gpsCommunicationContract, 

            IDeviceRepository deviceRepository,
            IPacketRepository packetRepository,
            IEventRepository eventRepository,
            ICurrentEventRepository currentEventRepository,
            IRequstAckCommandRepository requstAckCommandRepository,
            ICacheDataRepository cacheDataRepository,

            IDeviceStateDocuments deviceStateDocuments,

            IDailyMileageRepository dailyMileageRepository,
            IGeoPointRepository geoPointRepository,
            ILogDocuments logDocuments)
        {
            DeviceCommunicationService = deviceCommunicationService;

            DeviceRepository = deviceRepository;
            PacketRepository = packetRepository;
            EventRepository = eventRepository;
            CurrentEventRepository = currentEventRepository;
            RequstAckCommandRepository = requstAckCommandRepository;
            CacheDataRepository = cacheDataRepository;

            DeviceStateDocuments = deviceStateDocuments;

            GpsCommunicationContract = gpsCommunicationContract;

            DailyMileageRepository = dailyMileageRepository;
            GeoPointRepository = geoPointRepository;

            LogDocuments = logDocuments;
        }

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Tracking(string imei)
        {
            ViewBag.Imei = imei;
            ViewBag.FirstLat = 13.730157;
            ViewBag.FirstLng = 100.580547;
            ViewBag.FirstHeading = 0;
            ViewBag.FirstVehicleState = "Parking";
            ViewBag.FirstHeading = 0;
            ViewBag.FirstUniqueJournyId = 0;
            ViewBag.GroundSpeed = 0;
            ViewBag.Seq = 0;
            ViewBag.Heading = 0;

            var geoPointDto = DeviceCommunicationService.GetLastKnownLocation(imei);
            if (geoPointDto != null)
            {
                ViewBag.FirstLat = geoPointDto.Latitude;
                ViewBag.FirstLng = geoPointDto.Longitude;
                ViewBag.Seq = geoPointDto.Seq;
                ViewBag.Heading = geoPointDto.Heading;
            }

            return View();
        }
        public ActionResult Messages(string imei)
        {
            ViewBag.Imei = imei;
            ViewBag.MessageType = "All";
            return View();
        }

        public ActionResult Logs(string imei)
        {
            ViewBag.Imei = imei;
            return View();
        }
        public ActionResult DeviceEventAlert(string imei)
        {
            ViewBag.Imei = imei;
            return View();
        }
        public JsonResult GellAllDevice(int start, int limit)
        {
            var results = DeviceRepository.GetAll().Where(d => d.Imei != "0").ToList();
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
                    d.Firmware = deviceState.LatestFirmware.ToString();
                    d.VehicleState = deviceState.VehicleState;
                    d.ModeState = deviceState.ModeState;
                    d.Silent1State = deviceState.Silent1State;
                    d.ObdBlackoutState = deviceState.ObdBlackoutState;
                    d.MismatchVinState = deviceState.MismatchVinState;
                    d.TcpHangingState = deviceState.TcpHangingState;
                    d.ServerID = deviceState.DeviceWorldID;
                    d.ToDayCountMessages = deviceState.ToDayCountMessages;
                    d.ToDayInvalidChecksum = deviceState.ToDayInvalidChecksum;
                    d.Profile = deviceState.CurrentForceToChangeProfile;
                }
            });

            return Json(
                new { data = devices, total = total, success = true },
                JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetGpsFirstFix(string imei)
        {
            var gpsFirstFixList = PacketRepository
                .GetAllMessages<GpsFirstFixMessage>(imei, MessageType.GpsFirstFix)
                .Where(m => m.Version > 40)
                .OrderByDescending(m => m.CreateDate)
                .Take(100).ToList();

            gpsFirstFixList.ForEach(msg =>
            {
                msg.TimeToFirstFix = (ushort)Math.Min(msg.TimeToFirstFix, (ushort)1000);
                msg.Description = msg.HeaderTime.ToLocalTime().ToString("dd-MM-yyyy(HH:mm:ss)");
            });

            gpsFirstFixList.Reverse();

            return Json(
                new { data = gpsFirstFixList, total = gpsFirstFixList.Count },
                JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetEulerAngles(string imei, int start, int limit)
        {
            List<EulerAnglesViewModel> eulerAnglesList = new List<EulerAnglesViewModel>();

            int total = PacketRepository
                .GetAllMessages<EulerAnglesArrayMessage>(imei, MessageType.EulerAnglesArray).Count;

            var eulerAnglesArrayList = PacketRepository
                .GetAllMessages<EulerAnglesArrayMessage>(imei, MessageType.EulerAnglesArray)
                .OrderByDescending(m => m.HeaderTime)
                .Skip(start)
                .Take(limit)
                .ToList();

            var arrayMessageManager = new ArrayMessageManager();

            //eulerAnglesArrayList = eulerAnglesArrayList.Take(limit).ToList();


            eulerAnglesArrayList.ForEach(arraymsg =>
            {
                var packetList = PacketRepository.GetPacketIdAround(arraymsg.PacketId, new TimeSpan(0, 0, 5));

                if (arrayMessageManager.AddBufferArrayMessage(arraymsg))
                {
                    var arrayMsgList = arrayMessageManager.GetArrayMessageBuffer(arraymsg.MessageType).Values.ToList();
                    List<Message> msgs = arrayMessageManager.Aggregate(arrayMsgList).OrderByDescending(m => m.Seq).ToList();

                    msgs.ForEach(msg =>
                    {

                        EulerAnglesMessage eulerAnglesMessage = (EulerAnglesMessage)msg;
                        eulerAnglesList.Add(eulerAnglesMessage.ConvertToViewModel(arraymsg));
                    });

                    arrayMessageManager.ResetBuffer(MessageType.EulerAnglesArray);
                }
            });

            //run index
            int index = eulerAnglesList.Count;
            eulerAnglesList.ForEach(n =>
            {
                n.Index = index;
                --index;
            });

            return Json(
                new { data = eulerAnglesList, total = total },
                JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetJourneyBasis(string imei, int start, int limit)
        {
            IJourneyBasisDocuments journeyBasisDocuments = new JourneyBasisDocuments(Settings.Default.DocumentConnectionstring);
            var journeyBasisDocumentList = journeyBasisDocuments.GetByImei(imei);
            var results = journeyBasisDocumentList.ConvertToViewModel();
            int total = results.Count;
            results = results.OrderByDescending(d => d.StartJourney).ToList();

            return Json(
                new { data = results, total = total },
                JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDailyBasis(string imei, int start, int limit)
        {
            var dailyMileageList = DailyMileageRepository.GetAll(imei);
            //dailyMileageList.AsParallel().ForAll(dm =>
            //{
            //    //var totalOfGeopoint = GeoPointRepository.GetCountLocationsByDay(imei, dm.Id.ForDate);
            //    //dm.TotalGeopoint = totalOfGeopoint;

            //    var geopoints = GeoPointRepository.GetLocationsByDay(imei, dm.Id.ForDate);
            //    if (geopoints.Count > 0)
            //    {
            //        var last = geopoints.Last();
            //        var packet = PacketRepository.GetByPacketId(last.PacketId);
            //        var msg = packet.ToMessage();
            //        dm.Version = msg.Version;
            //    }
            //    DailyMileageRepository.Update(dm);
            //});

            var results = dailyMileageList.ConvertToViewModel();
            int total = results.Count;
            results = results.OrderByDescending(d => d.ForDate).ToList();
            
            return Json(
                new { data = results, total = total },
                JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetGeopoints(string imei, DateTime forDate)
        {
            List<GeoPointViewModel> geoPointDtoList = new List<GeoPointViewModel>();

            var geoPointList = GeoPointRepository.GetAllLocationsByDay(imei, forDate);
            var query = from g in geoPointList.ConvertToViewModel()
                        orderby g.Seq descending
                        select g;

            geoPointDtoList = query.ToList();

            MongoServer server = MongoServer.Create(Settings.Default.DocumentConnectionstring);
            var database = server.GetDatabase("spatial");
            using (server.RequestStart(database))
            {
                var geopoints = database.GetCollection("geopoints");

                geoPointDtoList.ForEach(geoloc =>
                {
                    //http://www.mongodb.org/display/DOCS/Geospatial+Indexing
                    string key = string.Format("{0}-{1}-{2}-{3}-{4}", geoloc.Seq, imei, forDate, geoloc.Latitude, geoloc.Longitude);
                    BsonDocument geopoint = new BsonDocument {
                        { "_id", key },
                        { "imei", imei },
                        { "forDate", forDate},
                        { "seq", geoloc.Seq },
                        { "loc", new BsonDocument{
                                { "lon", (double)geoloc.Longitude },
                                { "lat", (double)geoloc.Latitude },
                            }
                        }
                    };

                    geopoints.Save(geopoint);
                });
                //By default, the index assumes you are indexing longitude/latitude and is thus configured for a [-180..180
                geopoints.EnsureIndex(IndexKeys.GeoSpatial("loc"));

                geoPointDtoList.ForEach(geoloc =>
                {
                    var earthRadius = 6378; // km
                    var range = 0.2; // km

                    var near = Query.And(
                        Query.WithinCircle("loc", (double)geoloc.Longitude, (double)geoloc.Latitude, range/earthRadius, true), 
                        Query.EQ("imei", imei), 
                        Query.EQ("forDate", forDate));

                    var result = geopoints.Find(near).ToList();
                    geoloc.TotalNear = result.Count;
                });

                var maxTotalNear = geoPointDtoList.Max(geoloc => geoloc.TotalNear);
                geoPointDtoList.ForEach(geoloc =>
                {
                    geoloc.MaxTotalNear = maxTotalNear;
                });
                //find({ loc:{$near:[100.51242,13.75998], $maxDistance : 200} })
            }

            return Json(
                new { data = geoPointDtoList },
                JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetLastKnownLocation(string imei)
        {
            GeoPointDto geoPointDto = DeviceCommunicationService.GetLastKnownLocation(imei);

            GeoPointViewModel result = new GeoPointViewModel(geoPointDto);

            return Json(
                new { data = result, total = 1, success = true },
                JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetGeoFence(string packetId)
        {

            var currentConfMsg = DeviceCommunicationService.GetGeoFenceConfByPacketId(packetId);

            return Json(
                new { data = currentConfMsg, total = 1, success = true },
                JsonRequestBehavior.AllowGet);
        }

        public JsonResult MessagesPaging(string imei, int start, int limit)
        {
            var request = this.HttpContext.Request;
            //filter[0][field]:MessageType
            string filter_field = request["filter[0][field]"];
            //filter[0][data][type]:string
            string filter_data_type = request["filter[0][data][type]"];

            //filter[0][data][value]:GeoPoint
            string filter_data_value = request["filter[0][data][value]"];

            List<Packet> packetList = new List<Packet>();
            int total = 0;
            if (!string.IsNullOrEmpty(filter_data_value))
            {
                var groupByMessageType = MessageHeader.SameMessageType(filter_data_value);
                foreach (var msgType in groupByMessageType)
                {
                    var packet = PacketRepository.GetPacketByImei(imei, start, limit, msgType);
                    packetList.AddRange(packet);

                    total += PacketRepository.CountPacketByImei(imei, msgType);
                }

                packetList = packetList.OrderByDescending(p => p.HeaderTime).Take(limit).ToList();

            }
            else
            {
                var packet = PacketRepository.GetPacketByImei(imei, start, limit);
                packetList.AddRange(packet);
                total = PacketRepository.CountPacketByImei(imei);
            }

            List<Message> msgList = new List<Message>();
            packetList.ForEach(packet =>
            {
                msgList.Add(packet.ToMessage());
            });

            msgList.Sort((x, y) =>
            {
                long numY = y.Seq + y.HeaderTime.Ticks;
                long numX = x.Seq + x.HeaderTime.Ticks;
                return numY.CompareTo(numX);
            });

            var msgModels = msgList.ToMessageModels();

            return Json(
                new { data = msgModels.ToList(), total = total },
                JsonRequestBehavior.AllowGet);
        }
        public JsonResult MessageCode(string packetId)
        {
            
            List<DataCode> messageDataList = new List<DataCode>();
            List<MessageCodeViewModel> results = new List<MessageCodeViewModel>();

            if (packetId.Contains("TCP"))
            {
                string[] values = packetId.Split('|');
                if (values.Length >= 2)
                {
                    int reqId = 0;
                    if (int.TryParse(values[1], out reqId))
                    {
                        if (reqId != 0)
                        {
                            reqId = int.Parse(values[1]);
                            var req = RequstAckCommandRepository.Get(reqId);

                            //ViewBag.Imei = req.Imei;

                            if (!string.IsNullOrEmpty(req.ResponsePacketMD5))
                            {
                                var cacheData = CacheDataRepository.Get(req.ResponsePacketMD5);
                                req.ResponsePackets = cacheData.Data;
                            }

                            Message msg = req.ResponsePackets.ToConfMessage();

                            messageDataList.AddRange(msg.ToDataCodes());
                            //messageDataList.Add(new DataCode { Name = "Length", Value = req.ResponsePackets.Length });

                            ViewBag.MessageType = msg.MessageType.ToString();
                            if (req.ResponsePackets.Length == 1925)
                            {
                                ViewBag.MessageType = MessageType.AgpsBlock;

                            }
                        }
                        
                    }
                    else
                    {
                        messageDataList.Add(new DataCode
                        {
                            Name = "ServerLog",
                            Value = values[1],
                        });
                    }
                }
            }
            else
            {
                var packet = PacketRepository.GetByPacketId(packetId);
                var parseMsg = packet.ToMessage();

                if (parseMsg.IsArrayMessage)
                {
                    messageDataList.AddRange(parseMsg.ToDataCodes());

                    var singleMessages = parseMsg.ToSingleMessages();
                    singleMessages.ToList().ForEach(msg =>
                    {
                        messageDataList.AddRange(msg.ToDataCodes());
                    });
                    
                    //var packetList = PacketRepository.GetPacketIdAround(packetId, new TimeSpan(0, 0, 5));

                    //var arrayMessageManager = new ArrayMessageManager();

                    //packetList.ForEach(p =>
                    //{
                    //    var arraymsg = Message.ToMessage(p.RawPacket) as ArrayMessage;

                    //    if (arraymsg != null)
                    //    {
                    //        if (arrayMessageManager.AddBufferArrayMessage(arraymsg))
                    //        {
                    //            var arrayMsgList = arrayMessageManager.GetArrayMessageBuffer(arraymsg.MessageType).Values.ToList();
                    //            var msgs = arrayMessageManager.Aggregate(arrayMsgList);

                    //            messageDataList.AddRange(msgs.ToDataCodes());
                    //        }
                    //    }
                    //});
                }
                else
                {
                    messageDataList.AddRange(parseMsg.ToDataCodes());
                }

                if (parseMsg.MessageType == MessageType.Undefined)
                {
                    messageDataList.Add(new DataCode
                    {
                        Name = "RawPacket",
                        Value = BitConverter.ToString(packet.RawPacket.ToArray()),
                    });
                }

            }

            
            messageDataList.ForEach(msg =>
            {
                results.Add(new MessageCodeViewModel
                {
                    Name = msg.Name,
                    Value = msg.Value.ToString(),
                    Description = msg.Description,
                });
            });

            return Json(
                new { data = results },
                JsonRequestBehavior.AllowGet);
        }

        public JsonResult LogsPaging(string imei, int start, int limit)
        {
            List<Log> currentEntrys = new List<Log>();

            var device = DeviceRepository.GetByImei(imei);
            if(device == null)
                return Json(
                new { data = currentEntrys, total = 0 },
                JsonRequestBehavior.AllowGet);

            var request = this.HttpContext.Request;
            //filter[0][field]:MessageType
            string filter_field = request["filter[0][field]"];
            //filter[0][data][type]:string
            string filter_data_type = request["filter[0][data][type]"];

            //filter[0][data][value]:GeoPoint
            string filter_data_value = request["filter[0][data][value]"];

            int total = 0;
            try
            {
                EventLog eventlog = new EventLog
                {
                    MachineName = System.Net.Dns.GetHostName(),
                    Log = "GPS Commun Log",
                };

                total = LogDocuments.CountByImei(imei);
                var page = LogDocuments.GetByImei(imei, start, limit);
                

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

                currentEntrys.AsParallel().ForAll(log =>
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
                new { data = currentEntrys, total = total },
                JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeviceEventAlertPaging(string imei, int start, int limit)
        {
            IList<DeviceEventAlert> deviceEventAlerts = new List<DeviceEventAlert>();

            long total = CarPass.Repositories.Documents.DeviceEventAlert.CountByImei(imei, Settings.Default.DocumentConnectionstring);
            deviceEventAlerts = CarPass.Repositories.Documents.DeviceEventAlert.GetByImei(imei, start, limit, Settings.Default.DocumentConnectionstring);

            return Json(
                new { data = deviceEventAlerts.OrderByDescending( d => d.CreateDate), total = total },
                JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetObdDtcCodesStatus(string packetId)
        {
            var packet = PacketRepository.GetByPacketId(packetId);
            var obdDtcCodesAlertMessage = packet.ToMessage() as ObdDtcCodesAlertMessage;
            var obdDtcCodesStatus = obdDtcCodesAlertMessage.GetObdDtcCodesStatus();

            return Json(
                new { data = obdDtcCodesStatus }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetHistogramBinRawData(string packetId)
        {
            var packet = PacketRepository.GetByPacketId(packetId);
            var histogramBinRawData = packet.ToMessage() as HistogramBinRawDataMessage;

            var info = PacketRepository.GetHistogramInfoMessageByHistogramBinRawData(histogramBinRawData);
            
            if (info.HistogramType == 1)//1 = Z & SPEED
            {
                var histogramMatrix = histogramBinRawData.ConvertToHistogramMatrix(info);
                var list = histogramMatrix.ConvertSumIRawData(info);//Z
                var list2 = histogramMatrix.ConvertSumJRawData(info);//Speed

                return Json(
                new { data = list2, data2 = list, header = histogramBinRawData, info = info }, JsonRequestBehavior.AllowGet);
            }
            else if (info.HistogramType == 2)//2 = X & Y & SPEED
            {
                int sequenceCounterForFragmentation = histogramBinRawData.SequenceCounterForFragmentation;
                List<byte> totalRawdata = new List<byte>();
                if (sequenceCounterForFragmentation >= 0)
                {
                    List<Packet> packets = PacketRepository.GetPacketIdAfterByHeaderTime(packetId, new TimeSpan(0, 0, 15));
                    //packets = packets.OrderByDescending(p => p.Seq).ToList();
                    List<HistogramBinRawDataMessage> rawList = new List<HistogramBinRawDataMessage>();
                    packets.ForEach(p =>
                    {
                        var histogramData = p.ToMessage() as HistogramBinRawDataMessage;
                        if (histogramData != null)
                        {
                            if (histogramData.UniquedIdNumberForHistogram == info.UniquedIdNumberForHistogram)
                            {
                                rawList.Add(histogramData);
                            }
                        }
                    });
                    rawList = rawList.OrderBy(p => p.SequenceCounterForFragmentation).ToList();
                    rawList.ForEach(raw =>
                    {
                        totalRawdata.AddRange(raw.RawData);
                    });

                    //totalRawdata.AddRange(histogramBinRawData.RawData);
                }

                histogramBinRawData.RawData = totalRawdata.ToArray();
                var histogramMatrix = histogramBinRawData.ConvertToHistogramMatrix(info);
                var list = histogramMatrix.ConvertSumIRawData(info);//X
                var list2 = histogramMatrix.ConvertSumJRawData(info);//Y
                var list3 = histogramMatrix.ConvertSumKRawData();//Speed

                return Json(
                new { data = list3, data2 = list, data3 = list2, header = histogramBinRawData, info = info }, JsonRequestBehavior.AllowGet);
            }
            else if (info.HistogramType == 3)//3 = RPM & SPEED
            {
                var histogramMatrix = histogramBinRawData.ConvertToHistogramMatrix(info);
                var list = histogramMatrix.ConvertSumIRawData(info);//RPM
                var list2 = histogramMatrix.ConvertSumJRawData(info);//Speed

                return Json(
                new { data = list2, data2 = list, header = histogramBinRawData, info = info }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var list = histogramBinRawData.ConvertRawData(info);

                return Json(
                    new { data = list, header = histogramBinRawData, info = info }, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetImactArray1(string packetId)
        {
            var packet = PacketRepository.GetByPacketId(packetId);
            var theImpactArray = packet.ToMessage() as ImpactAlert1ArrayMessage;
            var theMsgs = (from m in theImpactArray.ToSingleMessages() select (ImpactAlert1Message)m).ToList();
            var theFirst = theMsgs.FirstOrDefault() as ImpactAlert1Message;

            int theKey = theFirst.ImpactUniqueID + theFirst.NumberOfDataPointInArray;

            var packets = PacketRepository.GetPacketIdAfterByHeaderTime(packetId, new TimeSpan(0, 0, 10));
            packets = packets.OrderByDescending(p => p.HeaderTime).ToList();

            List<ImpactAlert1ViewModel> results = new List<ImpactAlert1ViewModel>();

            packets.ForEach(p =>
            {
                var impactArray = p.ToMessage() as ImpactAlert1ArrayMessage;
                var msgs = (from m in impactArray.ToSingleMessages() select (ImpactAlert1Message)m).ToList();
                var first = msgs.FirstOrDefault() as ImpactAlert1Message;
                if (first != null)
                {
                    int key = first.ImpactUniqueID + first.NumberOfDataPointInArray;
                    if (key == theKey)
                    {
                        results.AddRange(msgs.ConvertToVM(impactArray.HeaderTime.ToLocalTime(), impactArray.Seq, impactArray.MsgId, impactArray.TotalMsg, impactArray.MsgNumber));
                    }
                }
            });

            results = results.OrderBy(m => m.Index).ToList();

            double delTime = 1d / 800;
            List<double> times = new List<double>();
            List<double> ax = new List<double>();
            List<double> ay = new List<double>();
            List<double> az = new List<double>();

            for (int i = 0; i < results.Count; i++)
            {
                times.Add(delTime * i);

                ax.Add(results[i].ValueOfXAxisAcceleration);
                ay.Add(results[i].ValueOfYAxisAcceleration);
                az.Add(results[i].ValueOfZAxisAcceleration);
            }

            var deltaVResult = ImpactAnalysis.DeltaVAdj(times.ToArray(), ax.ToArray(), ay.ToArray(), az.ToArray());

            return Json(
                new { data = results, deltaVAdj = deltaVResult }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetImactArray2(string packetId)
        {
            var packet = PacketRepository.GetByPacketId(packetId);
            var theImpactArray = packet.ToMessage() as ImpactAlert2ArrayMessage;
            var theMsgs = (from m in theImpactArray.ToSingleMessages() select (ImpactAlert2Message)m).ToList();
            var theFirst = theMsgs.FirstOrDefault() as ImpactAlert2Message;

            int theKey = theFirst.ImpactUniqueID + theFirst.NumberOfDataPointInArray;

            var packets = PacketRepository.GetPacketIdAfterByHeaderTime(packetId, new TimeSpan(0, 0, 10));
            packets = packets.OrderBy(p => p.HeaderTime).ToList();

            var results = new List<ImpactAlert2ViewModel>();

            packets.ForEach(p =>
            {
                var impactArray = p.ToMessage() as ImpactAlert2ArrayMessage;
                var msgs = (from m in impactArray.ToSingleMessages() select (ImpactAlert2Message)m).ToList();
                var first = msgs.FirstOrDefault() as ImpactAlert2Message;
                if (first != null)
                {
                    int key = first.ImpactUniqueID + first.NumberOfDataPointInArray;
                    if (key == theKey)
                    {
                        results.AddRange(msgs.ConvertToVM(impactArray.HeaderTime.ToLocalTime(), impactArray.Seq, impactArray.MsgId, impactArray.TotalMsg, impactArray.MsgNumber));
                    }
                }
            });

            //results = results.OrderBy(m => m.UtcTime).ToList();
            int index = 0;
            results.ForEach(r =>
            {
                r.Index = index++;
            });
            return Json(
                new { data = results }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GpsAwakeArray(string packetId)
        {
            var packet = PacketRepository.GetByPacketId(packetId);
            var gpsAwakeArrayArray = packet.ToMessage() as GpsAwakeArrayMessage;
            var theMsgs = (from m in gpsAwakeArrayArray.ToSingleMessages() select (GpsAwakeMessage)m).ToList();
            var results = theMsgs.ToViewModels();
            //results = results.OrderBy(r => r.SvAzimuth).ToList();
            var radialResult = results.OrderBy(r => r.SvAzimuth).ToList();

            return Json(
                new { gpsAwakes = results, radialResult = radialResult }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetRequestAckCommands()
        {
            var requestAckCommandMessageList = GpsCommunicationContract.GetPendingAckRequest();

            var results = new List<RequestAckCommandViewModel>();
            requestAckCommandMessageList.ToList().ForEach(item =>
            {
                var requestAckCmd = RequstAckCommandRepository.Get(item.RequestId);
                var cashData = CacheDataRepository.Get(requestAckCmd.ResponsePacketMD5);
                var msgType = cashData.Data.RequestAckMessage();

                results.Add(new RequestAckCommandViewModel
                {
                    ServerId = 4,
                    PushRequestTime = item.HeaderTime.ToLocalTime().ToString("dd/MM/yyyy HH:mm:ss"),
                    RequestId = (uint)item.RequestId,
                    Imei = item.Imei,
                    ResponseMessageType = msgType.ToString(),
                });

            });

            var gpsCommunicationContractDemo = new GpsCommunicationService.GpsCommunicationContractClient(
                "BasicHttpBinding_IGpsCommunicationContract", "http://demo01:8881/GpsCommunicationServer/GpsCommunicationService/");
            try
            {
                var requestAckCommandMessageDemoList = gpsCommunicationContractDemo.GetPendingAckRequest();
                requestAckCommandMessageDemoList.ToList().ForEach(item =>
                {
                    var requestAckCmd = RequstAckCommandRepository.Get(item.RequestId);
                    var cashData = CacheDataRepository.Get(requestAckCmd.ResponsePacketMD5);
                    var msgType = cashData.Data.RequestAckMessage();

                    results.Add(new RequestAckCommandViewModel
                    {
                        ServerId = 5,
                        PushRequestTime = item.HeaderTime.ToLocalTime().ToString("dd/MM/yyyy HH:mm:ss"),
                        RequestId = (uint)item.RequestId,
                        Imei = item.Imei,
                        ResponseMessageType = msgType.ToString(),
                    });

                });
            }
            catch
            {
            }
            return Json(
                new { data = results, total = results.Count },
                JsonRequestBehavior.AllowGet);
        }

        private object GpsCommunicationContractClient()
        {
            throw new NotImplementedException();
        }

        public JsonResult GetJourneySummary(string imei, int start, int limit)
        {
            var results = new List<JourneySummaryViewModel>();

            var msgs = PacketRepository.GetJourneySummaryByImei(imei, start, limit);
            results = msgs.ConvertToViewModel();

            results.Reverse();

            return Json(
                new { data = results, total = results.Count },
                JsonRequestBehavior.AllowGet);
        }

        public JsonResult RemovePacket(string packetId)
        {
            try
            {
                PacketRepository.Ignore(packetId);
            }
            catch (Exception ex)
            {
                return Json(
                new { message = ex.Message, success = false }, JsonRequestBehavior.AllowGet);
            }
            return Json(
                new { message = "", success = true }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Bypass(string imei)
        {
            try
            {
                var controller = new CarPass.Domains.StateMachines.DeviceModeController
                {
                    CommandsChannel = new LogCommandChannel(),
                    EventRepository = EventRepository,
                    CurrentEventRepository = CurrentEventRepository,
                };

                controller.Handle(
                            new DeviceModeEventMessage
                            {
                                Imei = imei,
                                Code = DeviceModeEventMessage.BypassCode,
                                Description = "Raise Bypass",
                            });
            }
            catch (Exception ex)
            {
                return Json(
                new { message = ex.Message, success = false }, JsonRequestBehavior.AllowGet);
            }

            return Json(
                new { message = "", success = true }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult BuildSimulationScript(List<PacketViewModel> packets)
        {
            var r = Request;
            List<Message> msgList = new List<Message>();
            HashSet<Type> types = new HashSet<Type>();
            packets.ForEach(id =>
            {
                var info = PacketRepository.GetByPacketId(id.PacketId);
                if (info != null)
                {
                    var msg = info.ToMessage();
                    msgList.Add(msg);

                    types.Add(msg.GetType());
                }
            });

            SimMessages simMsg = new SimMessages();
            simMsg.Messages = msgList;

            string simScriptsFolder = Url.Content(string.Format("~/Content/SimScripts"));
            if (!Directory.Exists(simScriptsFolder))
            {
                Directory.CreateDirectory(simScriptsFolder);
            }

            string fileName =simScriptsFolder + string.Format("/sim-script-{0}.xml", Guid.NewGuid());
            string scriptPath = Server.MapPath(fileName);

            using (TextWriter textWriter = new StreamWriter(scriptPath))
            {
                XmlSerializer serializer = new XmlSerializer(typeof(SimMessages), types.ToArray());
                serializer.Serialize(textWriter, simMsg);
            }

            return Json(
                new { script = fileName, success = true }, JsonRequestBehavior.AllowGet);

            //byte[] fileContents = System.Text.ASCIIEncoding.ASCII.GetBytes(script);
            //return File(fileContents, "application/xml", string.Format("simulation-script-{0}.xml", DateTime.Now.ToString("dd-mm-yyyy")));
        }

        public JsonResult GetObdSupport(string packetId)
        {
            var packet = PacketRepository.GetByPacketId(packetId);
            var obdCore = packet.ToMessage() as ObdCoreMessage;
            var obdSupport = obdCore.ToObdSupport();
            return Json(
                new { obdSupport = obdSupport }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SendAgain(string packetId)
        {
            try
            {
                var packet = PacketRepository.GetByPacketId(packetId);
                var msg = packet.ToMessage();
                long d = long.Parse(msg.Imei);
                byte[] b = BitConverter.GetBytes(d);
                string imei = ASCIIEncoding.Default.GetString(b).Remove(7);
                msg.Imei = imei;
                //msg.HeaderTime = DateTime.UtcNow;
                CarPass.Domains.Communications.Messages.GeoPointMessage geopoint = msg as CarPass.Domains.Communications.Messages.GeoPointMessage;
                if (geopoint != null)
                {
                    geopoint.UtcTime = DateTime.UtcNow;
                }
                UDP_helper udpHelper = new UDP_helper
                {
                    IsServer = false,
                    SendToAddr = "192.168.30.3",
                    SendToPort = 5555,
                };

                var udpPacket = msg.ToUdpPacket();

                udpHelper.DoSendPacket(udpPacket);
                udpHelper.WaitReceivedMessages(1);
                byte[] responsePacket = udpHelper.GetResponsePacket();

            }
            catch (Exception ex)
            {
                return Json(
                new { message = ex.Message, success = false }, JsonRequestBehavior.AllowGet);
            }
            return Json(
                new { message = "", success = true }, JsonRequestBehavior.AllowGet);
        }


        public FileResult GetImpactCsvFile(string packetId)
        {
            var packet = PacketRepository.GetByPacketId(packetId);
            var theImpactArray = packet.ToMessage() as ImpactAlert1ArrayMessage;

            var theMsgs = (from m in theImpactArray.ToSingleMessages() select (ImpactAlert1Message)m).ToList();
            var theFirst = theMsgs.FirstOrDefault() as ImpactAlert1Message;

            int theKey = theFirst.ImpactUniqueID + theFirst.NumberOfDataPointInArray;

            var packets = PacketRepository.GetPacketIdAfterByHeaderTime(packetId, new TimeSpan(0, 0, 10));
            packets = packets.OrderByDescending(p => p.HeaderTime).ToList();

            List<ImpactAlert1Message> results = new List<ImpactAlert1Message>();

            packets.ForEach(p =>
            {
                var impactArray = p.ToMessage() as ImpactAlert1ArrayMessage;
                var msgs = (from m in impactArray.ToSingleMessages() select (ImpactAlert1Message)m).ToList();
                var first = msgs.FirstOrDefault() as ImpactAlert1Message;
                if (first != null)
                {
                    int key = first.ImpactUniqueID + first.NumberOfDataPointInArray;
                    if (key == theKey)
                    {
                        results.AddRange(msgs);
                    }
                }
            });

            results = results.OrderBy(m => m.Index).ToList();

            double delTime = 1d / 800;
            List<double> times = new List<double>();
            List<double> ax = new List<double>();
            List<double> ay = new List<double>();
            List<double> az = new List<double>();

            for (int i = 0; i < results.Count; i++)
            {
                times.Add(delTime * i);

                ax.Add(results[i].ValueOfXAxisAcceleration);
                ay.Add(results[i].ValueOfYAxisAcceleration);
                az.Add(results[i].ValueOfZAxisAcceleration);
            }

            byte[] csvFile = results.ToCsvFile();

            return File(csvFile, "application/CSV", "imppact_" + packetId + ".csv");
        }
        public FileResult GetRawCsvFile(string packetId)
        {
            var packet = PacketRepository.GetByPacketId(packetId);
            var theImpactArray = packet.ToMessage();

            var results = new List<PacketViewModel>();
            var packetVM = new PacketViewModel
            {
                PacketId = packet.PacketId,
                Seq = packet.Seq,
                MessageType = theImpactArray.MessageType.ToString(),
                RawData = packet.RawPacket,
            };

            results.Add(packetVM);
            byte[] csvFile = results.ToCsvFile();

            return File(csvFile, "application/CSV", "rawdata_" + packetId + ".csv");
        }
    }

}
