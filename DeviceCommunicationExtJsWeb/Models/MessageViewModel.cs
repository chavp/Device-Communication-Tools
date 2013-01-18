using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CarPass.Domains.Communications.Messages;

namespace DeviceCommunicationExtJsWeb.Models
{
    public class MessageViewModel
    {
        public string Imei { get; set; }
        public string Version { get; set; }
        public string MessageType { get; set; }
        public int Seq { get; set; }

        public ushort? JouneyId { get; set; }

        public DateTime HeaderTime { get; set; }
        public DateTime CreatedTime { get; set; }

        public string PacketId { get; set; }

        public DateTime CreateAt { get; set; }
    }

    public static class MessageViewModelExtension
    {
        const string DateFormat = "dd/MM/yyyy HH:mm:ss";

        public static List<MessageViewModel> ToMessageModels(this List<Message> msgs)
        {
            var results = new List<MessageViewModel>();
            msgs.ForEach(msg =>
            {
                ushort? jneyId = null;
                switch (msg.MessageType)
                {
                    case MessageType.GeoPoint:
                        GeoPointMessage geopoint = (GeoPointMessage)msg;
                        jneyId = (ushort)geopoint.UniqueJouneyId;
                        break;
                    case MessageType.StartJourney:
                        StartJourneyMessage startJourney = (StartJourneyMessage)msg;
                        jneyId = (ushort)startJourney.JourneyId;
                        break;
                    case MessageType.JourneySummary:
                        JourneySummaryMessage journeySummary = (JourneySummaryMessage)msg;
                        jneyId = (ushort)journeySummary.JourneyId;
                        break;
                    case MessageType.GeoFenceAlert:
                        GeoFenceAlertMessage geoFenceAlert = (GeoFenceAlertMessage)msg;
                        jneyId = (ushort)geoFenceAlert.GeoPoint.UniqueJouneyId;
                        break;
                    default:
                        break;
                }

                results.Add(new MessageViewModel
                {
                    CreateAt = msg.CreateDate,
                    Imei = msg.Imei,
                    CreatedTime = msg.CreateDate,
                    MessageType = msg.MessageType.ToString(),
                    Seq = msg.Seq,
                    HeaderTime = msg.HeaderTime,
                    JouneyId = jneyId,
                    PacketId = msg.PacketId,
                    Version = msg.Version.ToString(),
                });
            });
            return results;
        }

    }
}