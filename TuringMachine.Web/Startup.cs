using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TuringMachine.Web.Startup))]
namespace TuringMachine.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
