using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Ninject;
using NHibernate;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using CarPass.Mappings.FluentNh.Repositories;
using CarPass.Domains.Communications.Repositories;
using System.Web.Mvc;
using NHibernate.ByteCode.Castle;
using CarPass.Mappings.FluentNh;
using DeviceCommunicationExtJsWeb.Properties;
using CarPass.Repositories.Documents;

namespace DeviceCommunicationExtJsWeb.Infrastucture
{
    public static class DeviceCommunicationWebDI
    {
        public static void Initialize()
        {
            IKernel kernel = new StandardKernel();
            kernel.Bind<ISessionFactory>().ToConstant(CreateSessionFactory()).InSingletonScope();

            kernel.Bind<IDeviceRepository>()
                .To<DeviceRepository>()
                .WithPropertyValue("SessionFactory", kernel.Get<ISessionFactory>());

            kernel.Bind<IPacketRepository>()
                .To<PacketRepository>()
                .WithPropertyValue("SessionFactory", kernel.Get<ISessionFactory>());

            kernel.Bind<IEventRepository>()
                .To<EventRepository>()
                .WithPropertyValue("SessionFactory", kernel.Get<ISessionFactory>());

            kernel.Bind<ICurrentEventRepository>()
                .To<CurrentEventRepository>()
                .WithPropertyValue("SessionFactory", kernel.Get<ISessionFactory>());

            kernel.Bind<IRequstAckCommandRepository>()
                .To<RequestAckCommandRepository>()
                .WithPropertyValue("SessionFactory", kernel.Get<ISessionFactory>());

            kernel.Bind<ICacheDataRepository>()
                .To<CacheDataRepository>()
                .WithPropertyValue("SessionFactory", kernel.Get<ISessionFactory>());

            kernel.Bind<IDailyMileageRepository>()
                .To<DailyMileageRepository>()
                .WithPropertyValue("SessionFactory", kernel.Get<ISessionFactory>());

            kernel.Bind<IGeoPointRepository>()
                .To<GeoPointRepository>()
                .WithPropertyValue("SessionFactory", kernel.Get<ISessionFactory>());

            kernel.Bind<IDeviceStateDocuments>()
                .To<DeviceStateDocuments>()
                .WithPropertyValue("ConnectionString", Settings.Default.DocumentConnectionstring);

            kernel.Bind<ILogDocuments>()
                .To<LogDocuments>()
                .WithPropertyValue("ConnectionString", Settings.Default.DocumentConnectionstring);

            //Init Services
            kernel.Bind<DeviceService.IDeviceCommunicationService>()
                .To<DeviceService.DeviceCommunicationServiceClient>();
            kernel.Bind<GpsCommunicationService.IGpsCommunicationContract>()
                .To<GpsCommunicationService.GpsCommunicationContractClient>();

            DependencyResolver.SetResolver(new NinjectDependencyResolver(kernel));
        }

        private static ISessionFactory CreateSessionFactory()
        {
            //Appist: 192.168.30.3
            return Fluently.Configure()
                .ProxyFactoryFactory<ProxyFactoryFactory>()
                .Database(MsSqlConfiguration.MsSql2008
                .ConnectionString(c => c
                .Server(Settings.Default.ServerDatabase) //dbuat01, 192.168.30.3, 192.168.10.11
                .Username(Settings.Default.UsernameDatabase)
                .Password(Settings.Default.PasswordDatabase)
                .Database(Settings.Default.Database)))
                .Mappings(m => m.FluentMappings.AddFromAssemblyOf<RequestAckCommandsMapping>())
                .ExposeConfiguration(c => c.SetProperty("current_session_context_class", "thread_static"))
                .BuildSessionFactory();
        }
    }
}