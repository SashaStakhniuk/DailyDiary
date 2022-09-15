using DailyDiary.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
<<<<<<< HEAD
                    //var datasContext = services.GetRequiredService<DailyDiaryDatasContext>();
                    //InitialDatas.Initialize(datasContext);
=======
                    var context = services.GetRequiredService<IdentityContext>();
                    var identityContext = services.GetRequiredService<IdentityContext>();
                    
                    //InitialIdentity.Initialize(identityContext);
                    //InitialDatas.Initialize(context);
                    var datasContext = services.GetRequiredService<DailyDiaryDatasContext>();
                    //var identityContext = services.GetRequiredService<IdentityContext>();
>>>>>>> refs/remotes/origin/main
                    InitialIdentity.Initialize(services).Wait();
                }
                catch (Exception ex)
                {
                    var loger = services.GetRequiredService<ILogger<Program>>();
                    loger.LogDebug(ex, "Db seting error");
                }
            }

            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
