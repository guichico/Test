using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Test.Areas.Identity.Data;
using Test.Models;

[assembly: HostingStartup(typeof(Test.Areas.Identity.IdentityHostingStartup))]
namespace Test.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
                services.AddDbContext<TestContext>(options =>
                    options.UseSqlServer(
                        context.Configuration.GetConnectionString("TestContextConnection")));

                services.AddDefaultIdentity<User>()
                    .AddEntityFrameworkStores<TestContext>();
            });
        }
    }
}