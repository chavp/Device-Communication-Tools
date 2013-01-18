using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using DeviceCommunicationExtJsWeb.Infrastucture;

namespace DeviceCommunicationExtJsWeb
{
    using AutoMapper;
    using CarPass.Domains.Communications.Agents;
    using DeviceCommunicationExtJsWeb.Models;

    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }

        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                "Default", // Route name
                "{controller}/{action}/{id}", // URL with parameters
                new { controller = "Devices", action = "Index", id = UrlParameter.Optional } // Parameter defaults
            );

        }

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            RegisterGlobalFilters(GlobalFilters.Filters);
            RegisterRoutes(RouteTable.Routes);

            //Configure AutoMapper
            Mapper.CreateMap<Device, DeviceViewModel>()
                .ForMember(dest => dest.LatestAccessTime, opt => opt.MapFrom(src => src.LastestAccessTime.Value));
                
            DeviceCommunicationWebDI.Initialize();
        }
    }
}