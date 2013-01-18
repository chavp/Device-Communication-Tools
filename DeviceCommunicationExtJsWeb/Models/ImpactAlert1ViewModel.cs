using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CarPass.Domains.Communications.Messages;
using System.Text;

namespace DeviceCommunicationExtJsWeb.Models
{
    public class ImpactAlert1ViewModel
    {
        public DateTime HeaderTime { get; set; }
        public int Seq { get; set; }

        public ushort MsgId { get; set; }
        public ushort TotalMsg { get; set; }
        public int MsgNumber { get; set; }

        public ushort ImpactUniqueID { get; set; }
        public byte ArrayType { get; set; }
        public ushort NumberOfDataPointInArray { get; set; }
        public ushort Index { get; set; }
        public double ValueOfXAxisAcceleration { get; set; }
        public double ValueOfYAxisAcceleration { get; set; }
        public double ValueOfZAxisAcceleration { get; set; }

    }

    public static class ImpactAlert1ViewModelExtension
    {
        public static ImpactAlert1ViewModel ConvertToVM(this ImpactAlert1Message msg,
            DateTime headerTime, int seq, ushort msgId, ushort totalMsg, int msgNumber)
        {
            var vm = new ImpactAlert1ViewModel
            {
                HeaderTime = headerTime,
                Seq = seq,
                MsgId = msgId,
                TotalMsg = totalMsg,
                MsgNumber = msgNumber,

                ImpactUniqueID = msg.ImpactUniqueID,
                ArrayType = msg.ArrayType,
                NumberOfDataPointInArray = msg.NumberOfDataPointInArray,
                Index = msg.Index,
                ValueOfXAxisAcceleration = msg.ValueOfXAxisAcceleration,
                ValueOfYAxisAcceleration = msg.ValueOfYAxisAcceleration,
                ValueOfZAxisAcceleration = msg.ValueOfZAxisAcceleration
            };

            return vm;
        }

        public static List<ImpactAlert1ViewModel> ConvertToVM(this List<ImpactAlert1Message> msgs,
            DateTime headerTime, int seq, ushort msgId, ushort totalMsg, int msgNumber)
        {
            var vms = new List<ImpactAlert1ViewModel>();
            msgs.ForEach( msg => 
            {
                vms.Add(msg.ConvertToVM(headerTime, seq, msgId, totalMsg, msgNumber));
            });

            return vms;
        }

        public static byte[] ToCsvFile(this List<ImpactAlert1Message> msgs)
        {
            //Index, AccX, AccY, AccZ
            string csv = "Index, AccX, AccY, AccZ" + System.Environment.NewLine;
            msgs.ForEach(msg =>
            {
                csv += string.Format("{0}, {1}, {2}, {3}{4}"
                    , msg.Index, msg.ValueOfXAxisAcceleration, msg.ValueOfYAxisAcceleration, msg.ValueOfZAxisAcceleration, System.Environment.NewLine);
            });

            return ASCIIEncoding.UTF8.GetBytes(csv);
        }
    }
}