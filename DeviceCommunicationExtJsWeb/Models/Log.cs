using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using CarPass.Domains.Communications.Messages.Extensions;

namespace DeviceCommunicationExtJsWeb.Models
{
    public class Log
    {
        public DateTime TimeGenerated { get; set; }
        public string Message { get; set; }
        public string ErrorMessage { get; set; }

        public string MessageType { get; set; }
        public string Seq { get; set; }
        public string HeaderTime { get; set; }
        //public string UdpPacket { get; set; }
        public string AckCompleted { get; set; }
        public string ServerId { get; set; }
        public string ServerTime { get; set; }
        public string ResponseSeq { get; set; }
        public string StatusCode { get; set; }
        string _RequestId;
        public string RequestId 
        {
            get
            {
                return (_RequestId == "4294967295") ? "NA" : _RequestId;
            }
            set
            {
                _RequestId = value;
            }
        }
        public string AckPacket { get; set; }
        public string DeviceAddress { get; set; }
        public string PacketId { get; set; }
        public string Encryption { get; set; }

        //TCP
        public string RequestCommand { get; set; }
        public string ResponseMsgType { get; set; }
        public string WriteResponseElapsed { get; set; }
        public string TimesOfRequstCommand { get; set; }

        public void ParseMessageLog()
        {
            if (!string.IsNullOrEmpty(Message))
            {
                try
                {
                    #region Parse Log
                    if (Message.Contains("DeviceRequest"))//TCP
                    {
                        string[] messageLogs = Message.Split('|');
                        //0- MessageType:DeviceRequest|
                        //1- RequestCommand:0xFBF0|
                        //2- RequestId:1057|
                        //3- Device ID:13845257386213717|
                        //4- UtcTime:8/15/2011 4:23:31 AM|
                        //5- Response ACK Completed:True|
                        //6- Send(bytes):97|
                        //7- ResponseMsgType:AlgorithmConf|
                        //8- WriteResponseElapsed(milliseconds):0.0411|
                        //9- Times of RequstCommand:1
                        //10- Device Address = 192.168.9.205:18856
                        //11- Encryption = True
                        if (messageLogs.Length >= 11)
                        {
                            MessageType = messageLogs[0].Replace("MessageType:", "").Trim() + "[TCP]";
                            RequestCommand = messageLogs[1].Replace("RequestCommand:", "").Trim().ToCommandType();
                            RequestId = messageLogs[2].Replace("RequestId:", "").Trim();
                            HeaderTime = messageLogs[4].Replace("UtcTime:", "").Trim();
                            AckCompleted = messageLogs[5].Replace("Response ACK Completed:", "").Trim();
                            if (AckCompleted.Equals("true", StringComparison.InvariantCultureIgnoreCase))
                            {
                                AckCompleted += ", send = " + messageLogs[6].Replace("Send(bytes):", "").Trim() + " bytes";
                            }
                            ResponseMsgType = messageLogs[7].Replace("ResponseMsgType:", "").Trim();

                            WriteResponseElapsed = messageLogs[8].Replace("WriteResponseElapsed(milliseconds):", "").Trim();
                            TimesOfRequstCommand = messageLogs[9].Replace("Times of RequstCommand:", "").Trim();
                            DeviceAddress = messageLogs[10].Replace("Device Address =", "").Trim();
                            PacketId = "TCP|" + RequestId;
                            if (messageLogs.Length == 12)
                            {
                                Encryption = messageLogs[11].Replace("Encryption =", "").Trim();
                            }
                        }
                        //0- MessageType:DeviceRequest|
                        //1- RequestCommand:0xFBF0|
                        //2- RequestId:1057|
                        //3- Device ID:13845257386213717|
                        //4- UtcTime:8/15/2011 4:23:31 AM|
                        //5- Response ACK Completed:True|
                        //6- Send(bytes):97|
                        //7- ResponseMsgType:AlgorithmConf|
                        //8- Times of RequstCommand:1
                        //9- Device Address = 192.168.9.205:18856
                        else if (messageLogs.Length == 10)
                        {
                            MessageType = messageLogs[0].Replace("MessageType:", "").Trim() + "[TCP]";
                            RequestCommand = messageLogs[1].Replace("RequestCommand:", "").Trim();
                            RequestId = messageLogs[2].Replace("RequestId:", "").Trim();
                            HeaderTime = messageLogs[4].Replace("UtcTime:", "").Trim();

                            if (RequestCommand == "0xFBF0")
                            {
                                AckCompleted = messageLogs[5].Replace("Response ACK Completed:", "").Trim();
                                if (AckCompleted.Equals("true", StringComparison.InvariantCultureIgnoreCase))
                                {
                                    AckCompleted += ", send = " + messageLogs[6].Replace("Send(bytes):", "").Trim() + " bytes";
                                }
                                ResponseMsgType = messageLogs[7].Replace("ResponseMsgType:", "").Trim();
                                TimesOfRequstCommand = messageLogs[8].Replace("Times of RequstCommand:", "").Trim();
                                DeviceAddress = messageLogs[9].Replace("Device Address =", "").Trim();
                                PacketId = "TCP|" + RequestId;
                                RequestCommand = RequestCommand.ToCommandType();
                            }
                            else if (RequestCommand == "0xFBF1")
                            {
                                //0- MessageType:DeviceRequest|
                                //1- RequestCommand:0xFBF1|
                                //2- RequestId:Hanging|
                                //3- Device ID:14689682315888979|
                                //4- UtcTime:9/14/2011 9:16:17 AM|
                                //5- TcpPacket:F0-FE-01-00-00-00-00-58-00-89-01-00-90-01-01-00-00-00-91-01-01-00-00-00-92-01-00-00-93-01-00-00-94-01-00-00-95-01-00-00-96-01-00-00-97-01-00-00-98-01-00-99-01-00-00-02-00-01-02-00-18-02-00-00-19-02-00-00-24-03-00-94-03-00-00-95-03-00-00-96-03-00-00-00-00-97-03-00-00-00-00-98-03-00-00-00-00|
                                //6- Send:97|
                                //7- MessageType:HistogramsConf|
                                //8- Encryption:True|
                                //9- Device Address = 192.168.9.205:6983
                                string packetString = messageLogs[5].Replace("TcpPacket:", "").Trim();

                                ErrorMessage = "Packet:=" + packetString;
                                AckCompleted = "Send = " + messageLogs[6].Replace("Send:", "").Trim() + " bytes";
                                MessageType = "ServerHanging[TCP]";
                                ResponseMsgType = messageLogs[7].Replace("MessageType:", "").Trim();
                                Encryption = messageLogs[8].Replace("Encryption:", "").Trim();
                                DeviceAddress = messageLogs[9].Replace("Device Address =", "").Trim();
                                PacketId = "TCP|" + RequestId;
                                RequestCommand = "";
                            }
                        }
                        //0- MessageType:DeviceRequest|
                        //1- RequestCommand:0xFBF1|
                        //2- RequestId:0|
                        //3- Device ID:14689682315888979|
                        //4- UtcTime:9/14/2011 9:16:02 AM|
                        //5- Device Address = 192.168.9.205:6983
                        else if (messageLogs.Length == 6)
                        {
                            MessageType = messageLogs[0].Replace("MessageType:", "").Trim() + "[TCP]";
                            RequestCommand = messageLogs[1].Replace("RequestCommand:", "").Trim().ToCommandType();
                            RequestId = messageLogs[2].Replace("RequestId:", "").Trim();
                            HeaderTime = messageLogs[4].Replace("UtcTime:", "").Trim();
                            DeviceAddress = messageLogs[5].Replace("Device Address =", "").Trim();
                            PacketId = "TCP|" + RequestId;
                        }
                        //0- MessageType:DeviceRequest|
                        //1- RequestCommand:0xFBF1|
                        //2- RequestId:0|
                        //3- Device ID:352848022886713|
                        //4- UtcTime:7/17/2012 8:09:06 AM|
                        //5- Device Address = 49.229.104.220:4108|
                        //6- Encryption = True
                        else if (messageLogs.Length == 7)
                        {
                            MessageType = messageLogs[0].Replace("MessageType:", "").Trim() + "[TCP]";
                            RequestCommand = messageLogs[1].Replace("RequestCommand:", "").Trim().ToCommandType();
                            RequestId = messageLogs[2].Replace("RequestId:", "").Trim();
                            HeaderTime = messageLogs[4].Replace("UtcTime:", "").Trim();
                            DeviceAddress = messageLogs[5].Replace("Device Address =", "").Trim();
                            Encryption = messageLogs[6].Replace("Encryption =", "").Trim();
                            PacketId = "TCP|";
                        }
                        else
                        {
                            ErrorMessage = Message;
                        }
                    }
                    else //UDP
                    {

                        string[] messageLogs = Message.Split('|');
                        //0- Device ID:352848022885798|
                        //1- MessageType:NonGeoPointGsmInfoArray|
                        //2- Seq:794|
                        //3- HeaderTime:1/1/2010 12:04:36 AM|
                        //4- UdpPacket: 02-1A-03-A6-55-10-D5-E9-40-01-44-14-01-00-00-00-FF-01-00-01-00-04-00-08-10-01-28-00-29-00-30-00-31-00-32-00-33-00-27-00-13-00-22-02-01-68-41-09-20-00-55-02-01-13-00-04-00-00-00-00-25-00-01-70-C2-02-28-00-01-00-FF-13-00-04-00-00-00-00-02-02-01-68-41-25-02-00-04-00-FF-13-00-04-00-00-00-00-04-02-01-68-41-00-03-00-00-00-FF-12-00-24-21-00-04-00-42-02-01-78-C3-17-32-00-08-00-FF-13-00-24-63-7C-04-00-2A-02-01-78-C3-FF-2A-00-05-00-FF-02-4E-E6-C3-03|
                        //5- Ack Completed = Seq:1829|
                        //6- ServerId:4|
                        //7- ServerTime:5/21/2012 9:57:42 AM|
                        //8- ResponseSeq:794|
                        //9- StatusCode:4,Invalid Checksum|
                        //10- RequestId:4294967295|
                        //11- AckPacket:02-25-07-04-96-D6-7C-04-1A-03-04-00-FF-FF-FF-FF-31-27-CD-85-03
                        if (messageLogs.Length == 12)
                        {
                            MessageType = messageLogs[1].Replace("MessageType:", "").Trim();
                            Seq = messageLogs[2].Replace("Seq:", "").Trim();
                            HeaderTime = messageLogs[3].Replace("HeaderTime:", "").Trim();
                            //UdpPacket = messageLogs[4].Replace("UdpPacket:", "").Trim();
                            AckCompleted = messageLogs[5].Replace("Ack Completed = Seq:", "").Trim();
                            ServerId = messageLogs[6].Replace("ServerId:", "").Trim();
                            ServerTime = messageLogs[7].Replace("ServerTime:", "").Trim();
                            ResponseSeq = messageLogs[8].Replace("ResponseSeq:", "").Trim();
                            StatusCode = messageLogs[9].Replace("StatusCode:", "").Trim();
                            if (!string.IsNullOrEmpty(StatusCode))
                            {
                                StatusCode = int.Parse(StatusCode).ToRespStatusType();
                            }
                            //StatusCode = StatusCode.Substring(0, StatusCode.IndexOf(","));
                            RequestId = messageLogs[10].Replace("RequestId:", "").Trim();
                            AckPacket = messageLogs[11].Replace("AckPacket:", "").Trim();
                        }
                        //0 - Device ID:352848024097277
                        //1 - |MessageType:GeoPoint 
                        //2 - |Seq:51
                        //3 - |HeaderTime:8/4/2011 9:28:43 AM
                        //4 - |UdpPacket: 02-33-00-FD-D1-22-D5-E9-40-01-23-4B-2B-FD-02-07-00-02-00-2B-2B-FD-02-00-37-10-27-08-CE-05-F5-3B-58-00-3D-B5-00-0E-0B-51-67-35-03
                        //5 - |Ack Completed = Seq:108
                        //6 - |ServerId:4
                        //7 - |ServerTime:8/4/2011 4:28:46 PM
                        //8 - |ResponseSeq:51
                        //9 - |StatusCode:1,Valid Checksum
                        //10 - |RequestId:65535
                        //11 - |AckPacket:02-6C-00-04-BE-8D-FD-02-33-00-01-00-FF-FF-00-00-9C-ED-CC-5A-03
                        //12 - |Device Address = 49.228.94.85:4096
                        //13 - |Packet ID = 14cd1081-84bf-4b4c-a46e-29d5a2906247"
                        //14 - |Encryption = True
                        else if (messageLogs.Length >= 14)
                        {
                            MessageType = messageLogs[1].Replace("MessageType:", "").Trim();
                            Seq = messageLogs[2].Replace("Seq:", "").Trim();
                            HeaderTime = messageLogs[3].Replace("HeaderTime:", "").Trim();
                            //UdpPacket = messageLogs[4].Replace("UdpPacket:", "").Trim();
                            AckCompleted = messageLogs[5].Replace("Ack Completed = Seq:", "").Trim();
                            ServerId = messageLogs[6].Replace("ServerId:", "").Trim();
                            ServerTime = messageLogs[7].Replace("ServerTime:", "").Trim();
                            ResponseSeq = messageLogs[8].Replace("ResponseSeq:", "").Trim();
                            StatusCode = messageLogs[9].Replace("StatusCode:", "").Trim();
                            StatusCode = StatusCode.Substring(0, StatusCode.IndexOf(","));
                            if (!string.IsNullOrEmpty(StatusCode))
                            {
                                StatusCode = int.Parse(StatusCode).ToRespStatusType();
                            }
                            RequestId = messageLogs[10].Replace("RequestId:", "").Trim();
                            AckPacket = messageLogs[11].Replace("AckPacket:", "").Trim();
                            DeviceAddress = messageLogs[12].Replace("Device Address =", "").Trim();
                            PacketId = messageLogs[13].Replace("Packet ID =", "").Trim();
                            if (messageLogs.Length == 15)
                            {
                                Encryption = messageLogs[14].Replace("Encryption =", "").Trim();
                            }
                        }
                        else if (Message.Contains("Hanging Command"))
                        {
                            ErrorMessage = "[TCP]" + Message;
                        }
                        else if (messageLogs.Length == 2)
                        {
                            MessageType = "ServerRemoveTcpHanging";
                            //Server Remove Connection: Device ID: 352848022886713 | IP: 49.228.214.230:4143.
                            DeviceAddress = messageLogs[1].Trim().Replace("IP:", "");
                            PacketId = "TCP|LOG";
                        }
                        else
                        {
                            ErrorMessage = Message;
                        }
                    }
                    #endregion

                }
                catch
                {
                    ErrorMessage = Message;
                }
            }
        }
    }
}