using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CarPass.Domains.Communications.Messages;

namespace DeviceCommunicationExtJsWeb.Models
{
    public class ImpactAlert2ViewModel
    {
        public DateTime HeaderTime { get; set; }
        public int Seq { get; set; }

        public ushort MsgId { get; set; }
        public ushort TotalMsg { get; set; }
        public int MsgNumber { get; set; }

        public int Index { get; set; }

        public UInt16 ImpactUniqueID { get; set; }
        public byte ArrayType { get; set; }
        public UInt16 NumberOfDataPointInArray { get; set; }

        public ushort UniqueJouneyId { get; set; }
        public DateTime UtcTime { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public uint LatitudePlot { get; set; }
        public uint LongitudePlot { get; set; }
        public short Altitude { get; set; }
        public byte GroundSpeed { get; set; }
        public short Heading { get; set; }
        public byte NumberOfSatellitesUsed { get; set; }
    }

    public static class ImpactAlert2ViewModelExtension
    {
        public static ImpactAlert2ViewModel ConvertToVM(this ImpactAlert2Message msg,
            DateTime headerTime, int seq, ushort msgId, ushort totalMsg, int msgNumber)
        {
            var vm = new ImpactAlert2ViewModel
            {
                HeaderTime = headerTime,
                Seq = seq,
                MsgId = msgId,
                TotalMsg = totalMsg,
                MsgNumber = msgNumber,

                ImpactUniqueID = msg.ImpactUniqueID,
                ArrayType = msg.ArrayType,
                NumberOfDataPointInArray = msg.NumberOfDataPointInArray,

                UniqueJouneyId = (ushort)msg.GeoPoint.UniqueJouneyId,
                UtcTime = msg.GeoPoint.UtcTime,
                Latitude = msg.GeoPoint.Latitude,
                Longitude = msg.GeoPoint.Longitude,
                LatitudePlot = (uint)(10000000 * msg.GeoPoint.Latitude),
                LongitudePlot = (uint)(10000000 * msg.GeoPoint.Longitude),
                Altitude = msg.GeoPoint.Altitude,
                GroundSpeed = msg.GeoPoint.Groundspeed,
                Heading = msg.GeoPoint.Heading,
                NumberOfSatellitesUsed = msg.GeoPoint.NumberOfSatellitesUsed,

            };

            return vm;
        }

        public static List<ImpactAlert2ViewModel> ConvertToVM(this List<ImpactAlert2Message> msgs,
            DateTime headerTime, int seq, ushort msgId, ushort totalMsg, int msgNumber)
        {
            var vms = new List<ImpactAlert2ViewModel>();
            msgs.ForEach(msg =>
            {
                vms.Add(msg.ConvertToVM(headerTime, seq, msgId, totalMsg, msgNumber));
            });

            return vms;
        }
    }
}