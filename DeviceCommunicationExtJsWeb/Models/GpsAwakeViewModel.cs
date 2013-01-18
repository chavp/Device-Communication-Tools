using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CarPass.Domains.Communications.Messages;

namespace DeviceCommunicationExtJsWeb.Models
{
    public class GpsAwakeViewModel
    {
        public byte SvId { get; set; }
        public byte SvC_No { get; set; }
        public byte SvElevation { get; set; }
        public ushort SvAzimuth { get; set; }

        public ushort SvC_No_Threshold { get; set; }
    }

    public static class GpsAwakeViewModelExtension
    {
        public static List<GpsAwakeViewModel> ToViewModels(this List<GpsAwakeMessage> gpsAwakeMessages)
        {
            List<GpsAwakeViewModel> results = new List<GpsAwakeViewModel>();
            gpsAwakeMessages.ForEach(gpsMsg =>
            {
                var vm = new GpsAwakeViewModel
                {
                    SvId = gpsMsg.SvId,
                    SvC_No = gpsMsg.SvC_No,
                    SvAzimuth = gpsMsg.SvAzimuth,
                    SvElevation = gpsMsg.SvElevation,
                    SvC_No_Threshold = 20,
                };

                results.Add(vm);
            });
            return results;
        }
    }
}