using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using CarPass.Domains.StateMachines;
using CarPass.Domains.Communications.Messages;

namespace DeviceCommunicationExtJsWeb.Models
{
    public class LogCommandChannel : CommandChannel
    {
        public override void Send(string code, EventMessage evMessage)
        {
            Console.WriteLine(
                "Execute Command : " + code +
                " <| [" + evMessage.StartState + " - " + evMessage.Code + "->" + evMessage.TargetState
                + "] WhenOcurred: " + evMessage.WhenOcurred
                );
        }
    }
}