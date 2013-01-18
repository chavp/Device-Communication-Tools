using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CarPass.Repositories.Documents;

namespace DeviceCommunicationExtJsWeb.Models
{
    public class JourneyBasisDocumentViewModel
    {
        public int Version { get; set; }
        public int JourneyId { get; set; }
        public DateTime StartJourney { get; set; }
        public DateTime StopJourney { get; set; }
        public int HavDistanceFromGeopointsMeter { get; set; }
        public int HavDistanceMeter { get; set; }
        public int FullHavDistanceMeter { get; set; }
        public int FullIntDistanceMeter { get; set; }
        public double? DrValue { get; set; }
        public double? DrStandardDeviation { get; set; }
        public string JneyDuration { get; set; }
        public string DrivingDuration { get; set; }
        public string IdlingDuration { get; set; }

        public short Profile { get; set; }

        public bool IsLoasStartJney { get; set; }

        public string Imei { get; set; }
        public string DeviceSn { get; set; }
        public string JourneyStartId { get; set; }
        public string JourneySummaryId { get; set; }
    }

    public static class JourneyBasisDocumentViewModelExtension
    {
        public static List<JourneyBasisDocumentViewModel> ConvertToViewModel(this List<JourneyBasisDocument> data)
        {
            var results = (from d in data
                           select new JourneyBasisDocumentViewModel
                           {
                               Version = d.Version,
                               JourneyId = d.JourneyId,
                               StartJourney = d.StartJourney,
                               StopJourney = d.StopJourney,
                               HavDistanceFromGeopointsMeter = (int)d.HavDistanceFromGeopointsMeter,
                               HavDistanceMeter = (int)d.HavDistanceMeter,
                               JneyDuration = (d.StopJourney - d.StartJourney).ToString(),
                               DrivingDuration = d.DrivingDuration.ToString(),
                               IdlingDuration = d.IdlingDuration.ToString(),

                               FullHavDistanceMeter = (int)d.FullHavDistanceMeter,
                               FullIntDistanceMeter = (int)d.FullIntDistanceMeter,
                               DrValue = (d.DrValue == 1.6777214999999999) ? null : (double?)d.DrValue,
                               DrStandardDeviation = (d.DrStandardDeviation == 1.6777214999999999) ? null : (double?)d.DrStandardDeviation,

                               IsLoasStartJney = d.IsLoasStartJney,
                               Profile = d.ProfileNumber,

                               Imei = d.Id.Imei,
                               JourneyStartId = d.Id.JourneyStartId,
                               JourneySummaryId = d.Id.JourneySummaryId,

                           }).ToList();

            return results;
        }
    }
}