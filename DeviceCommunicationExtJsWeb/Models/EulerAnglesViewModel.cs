using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CarPass.Domains.Communications.Messages;

namespace DeviceCommunicationExtJsWeb.Models
{
    public class EulerAnglesViewModel
    {
        public DateTime HeaderTime { get; set; }
        public DateTime HeaderTimeUct { get; set; }

        public int Index { get; set; }

        public int Seq { get; set; }
        public int SubSeq { get; set; }

        public int EPsi { get; set; }
        public int ETheta { get; set; }
        public int EPhi { get; set; }

        public int MPsi { get; set; }
        public int MTheta { get; set; }
        public int MPhi { get; set; }

        public double TPsi { get; set; }
        public double TTheta { get; set; }
        public double TPhi { get; set; }
    }

    public static class EulerAnglesViewModelExtension
    {
        public static EulerAnglesViewModel ConvertToViewModel(this EulerAnglesMessage eMsg, EulerAnglesArrayMessage parent)
        {
            return new EulerAnglesViewModel
            {
                HeaderTime = parent.HeaderTime,
                HeaderTimeUct = parent.HeaderTime.ToLocalTime(),


                Seq = parent.Seq,
                SubSeq = eMsg.Seq,

                EPsi = eMsg.EulerAnglePsi,
                ETheta = eMsg.EulerAngleTheta,
                EPhi = eMsg.EulerAnglePhi,

                MPsi = eMsg.MedianValueForPsi,
                MTheta = eMsg.MedianValueForTheta,
                MPhi = eMsg.MedianValueForPhi,

                TPsi = eMsg.TemperaturePsi,
                TTheta = eMsg.TemperatureTheta,
                TPhi = eMsg.TemperaturePhi,
            };
        }
    }
}