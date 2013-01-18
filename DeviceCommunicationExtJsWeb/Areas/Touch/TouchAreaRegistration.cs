using System.Web.Mvc;

namespace DeviceCommunicationExtJsWeb.Areas.Touch
{
    public class TouchAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Touch";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Touch_default",
                "Touch/{controller}/{action}/{id}",
                new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
