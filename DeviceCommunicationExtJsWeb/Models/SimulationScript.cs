using System;
using System.Collections.Generic;
using System.Linq;

namespace DeviceCommunicationExtJsWeb.Models
{
    public class SimulationScript
    {
        public SimulationScript()
        {
            Messages = new List<CarPass.Domains.Communications.Messages.Message>();
        }
        public List<CarPass.Domains.Communications.Messages.Message> Messages { get; set; }
    }
}