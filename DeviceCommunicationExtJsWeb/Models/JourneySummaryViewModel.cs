using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CarPass.Domains.Communications.Messages;

namespace DeviceCommunicationExtJsWeb.Models
{
    public class JourneySummaryViewModel
    {
        public DateTime CreateDate { get; set; }
        public int Seq { get; set; }
        public int JourneyId { get; set; }
        public double? DrValue { get; set; }
        public double? DrStandardDeviation { get; set; }
    }

    public static class JourneySummaryViewModelExtension
    {
        public static List<JourneySummaryViewModel> ConvertToViewModel(this List<JourneySummaryMessage> eMsgs)
        {
            var results = new List<JourneySummaryViewModel>();

            var query = from msg in eMsgs
                        orderby msg.CreateDate descending, msg.Seq descending, msg.JourneyId descending
                          select new JourneySummaryViewModel
                          {
                              CreateDate = msg.CreateDate,
                              Seq = msg.Seq,
                              JourneyId = msg.JourneyId,
                              DrValue = (msg.DrValue == 1.6777214999999999) ? null : (double?)msg.DrValue,
                              DrStandardDeviation = (msg.DrStandardDeviation == 1.6777214999999999) ? null : (double?)msg.DrStandardDeviation,
                          };

            results.AddRange(query);

            return results;
        }
    }
}