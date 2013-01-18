using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DeviceCommunicationExtJsWeb.Models
{
    public class RequestAckCommandViewModel
    {
        public int ServerId { get; set; }
        public string PushRequestTime { get; set; }
        public uint RequestId { get; set; }
        public string Imei { get; set; }
        public string ResponseMessageType { get; set; }

    }
}