using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using DeviceCommunicationExtJsWeb.DeviceService;
using CarPass.Domains.Communications.Messages;

namespace DeviceCommunicationExtJsWeb.Models
{
    public class GeoPointViewModel
    {
        public int Seq { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public ushort Heading { get; set; }
        public int TotalNear { get; set; }
        public int MaxTotalNear { get; set; }
        public string FromMessage { get; set; }

        public GeoPointViewModel()
        {
        }

        public GeoPointViewModel(GeoPointDto geoPointDto)
        {
            Seq = geoPointDto.Seq;
            Latitude = geoPointDto.Latitude;
            Longitude = geoPointDto.Longitude;
            Heading = geoPointDto.Heading;
            //VehicleState = geoPointDto.VehicleState;
            //Heading = geoPointDto.Heading;
            //Seq = geoPointDto.Seq;
            //UniqueJournyId = geoPointDto.UniqueJournyId;
            //GroundSpeed = geoPointDto.GroundSpeed;
        }
    }

    public static class GeoPointViewModelExtension
    {
        public static List<GeoPointViewModel> ConvertToViewModel(this List<GeoPointMessage> data)
        {
            var results = (from d in data
                           select new GeoPointViewModel
                           {
                               Seq = d.Seq,
                               Latitude = d.Latitude,
                               Longitude = d.Longitude,
                               Heading = (ushort)d.Heading,
                               FromMessage = d.Message,
                           }).ToList();

            return results;
        }
    }
}