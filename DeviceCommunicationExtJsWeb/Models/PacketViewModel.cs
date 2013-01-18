using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;

namespace DeviceCommunicationExtJsWeb.Models
{
    public class PacketViewModel
    {
        public string PacketId { get; set; }
        public int Seq { get; set; }
        public string MessageType { get; set; }
        public byte[] RawData { get; set; }
    }

    public static class PacketViewModelExtension
    {

        public static byte[] ToCsvFile(this List<PacketViewModel> msgs)
        {
            //Index, AccX, AccY, AccZ
            string csv = "Seq, PacketId, MessageType, RawData" + System.Environment.NewLine;
            msgs.ForEach(msg =>
            {
                csv += string.Format("{0}, {1}, {2}, {3}{4}"
                    , msg.Seq, msg.PacketId, msg.MessageType, BitConverter.ToString(msg.RawData, 0), System.Environment.NewLine);
            });

            return ASCIIEncoding.UTF8.GetBytes(csv);
        }
    }
}