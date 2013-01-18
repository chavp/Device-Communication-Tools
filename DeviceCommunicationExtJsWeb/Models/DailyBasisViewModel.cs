using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CarPass.Domains.Communications.ValueObjects;

namespace DeviceCommunicationExtJsWeb.Models
{
    public class DailyBasisViewModel
    {
        public int Version { get; set; }
        public string Imei { get; set; }
        public string DeviceSN { get; set; }
        public DateTime ForDate { get; set; }
        public int HavDistanceFromGeopointsMeter { get; set; }
        public int TotalOfGeopoint { get; set; }
        public double MeterPerGeopoint { get; set; }
    }

    public static class DailyBasisViewModelExtension
    {
        public static List<DailyBasisViewModel> ConvertToViewModel(this List<DailyMileage> data)
        {
            var results = (from d in data
                           let meterPerGeopoint = (d.TotalGeopoint != 0)? Convert.ToDouble(d.HavDistanceMeters / d.TotalGeopoint):0
                select new DailyBasisViewModel
                {
                    Imei = d.Id.Imei,
                    ForDate = d.Id.ForDate,
                    HavDistanceFromGeopointsMeter = Convert.ToInt32(d.HavDistanceMeters),
                    TotalOfGeopoint = d.TotalGeopoint,
                    MeterPerGeopoint = meterPerGeopoint,
                    Version = d.Version,
                }).ToList();

            return results;
        }
    }
}