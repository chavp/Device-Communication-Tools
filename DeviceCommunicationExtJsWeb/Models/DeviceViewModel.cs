using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using CarPass.Domains.Communications.Repositories;
using CarPass.Domains.StateMachines;
using CarPass.Domains.Communications.Messages;
using CarPass.Domains.Communications.Agents;


namespace DeviceCommunicationExtJsWeb.Models
{
    using AutoMapper;

    public class DeviceViewModel
    {
        public string Imei { get; set; }
        public DateTime? CreateDate { get; set; }
        public string IP { get; set; }

        public DateTime LatestAccessTime { get; set; }


        public double LatestLatitude { get; set; }
        public double LatestLongitude { get; set; }

        public string Firmware { get; set; }

        public int ServerID { get; set; }
        public int CountMessages { get; set; }
        public int ToDayCountMessages { get; set; }
        public int ToDayInvalidChecksum { get; set; }

        public string VehicleState { get; set; }
        public string Silent1State { get; set; }
        public string ObdBlackoutState { get; set; }
        public string MismatchVinState { get; set; }

        public string ModeState { get; set; }

        //TcpHangingStateMachine
        public string TcpHangingState { get; set; }

        public string DeviceSn { get; set; }

        public byte Profile { get; set; }
    }

    public static class DeviceViewModelExtension
    {
        const string DateFormat = "dd/MM/yyyy HH:mm:ss";

        public static void LoadState(this DeviceViewModel dvm, IEventRepository eventRepository, ICurrentEventRepository currentEventRepository)
        {
            var currentEventMsg = getCurrentEvent(dvm.Imei, VehicleController.Name, eventRepository, currentEventRepository);
            if (currentEventMsg != null)
            {
                dvm.VehicleState = currentEventMsg.TargetState;
            }

            currentEventMsg = getCurrentEvent(dvm.Imei, DeviceModeController.Name, eventRepository, currentEventRepository);
            if (currentEventMsg != null)
            {
                dvm.ModeState = currentEventMsg.TargetState;
            }

            currentEventMsg = getCurrentEvent(dvm.Imei, Silent1Controller.Name, eventRepository, currentEventRepository);
            if (currentEventMsg != null)
            {
                dvm.Silent1State = currentEventMsg.TargetState;
            }

            currentEventMsg = getCurrentEvent(dvm.Imei, ObdBlackoutController.Name, eventRepository, currentEventRepository);
            if (currentEventMsg != null)
            {
                dvm.ObdBlackoutState = currentEventMsg.TargetState;
            }

            currentEventMsg = getCurrentEvent(dvm.Imei, MismatchVinController.Name, eventRepository, currentEventRepository);
            if (currentEventMsg != null)
            {
                dvm.MismatchVinState = currentEventMsg.TargetState;
            }

            currentEventMsg = getCurrentEvent(dvm.Imei, TcpHangingController.Name, eventRepository, currentEventRepository);
            if (currentEventMsg != null)
            {
                dvm.TcpHangingState = currentEventMsg.TargetState.Replace("Pull", "Polling");
            }
        }
        static EventMessage getCurrentEvent(string imei, string machineName, IEventRepository eventRepository, ICurrentEventRepository currentEventRepository)
        {
            EventMessage latesEventMsg = null;
            CurrentEvent currentEvent = currentEventRepository.Get(new CurrentEventId { Imei = imei, StateMachine = machineName });

            if (currentEvent != null)
            {
                latesEventMsg = eventRepository.Get(currentEvent.EventId);
            }
            else
            {
                latesEventMsg = eventRepository.GetCurrentEvent(imei, machineName);
            }

            return latesEventMsg;
        }

        public static List<DeviceViewModel> ToDeviceModels(this List<Device> devices)
        {
            var results = new List<DeviceViewModel>();
            devices.ForEach(d =>
            {
                DeviceViewModel dto = Mapper.Map<Device, DeviceViewModel>(d);
                results.Add(dto);
                //results.Add(new DeviceViewModel
                //{
                //    Imei = d.Imei,
                //    CreateDate = d.CreateDate,
                //    IP = d.IP,
                //    LatestAccessTime = d.LastestAccessTime.Value.ToString(DateFormat),
                //    LatestAccessDateTime = d.LastestAccessTime.Value,
                //    //StateModel = new DeviceStateModel
                //    //{
                //    //    Imei = d.Imei,
                //    //},
                //});
            });


            return results;
        }
    }
}