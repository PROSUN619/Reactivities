using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Persistence;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
           // CreateHostBuilder(args).Build().Run();
           //check if database created if not then create database
           var host =CreateHostBuilder(args).Build();

           using var scope = host.Services.CreateScope();
           var Services = scope.ServiceProvider;

           try
           {
                var context = Services.GetRequiredService<DataContext>();
                await context.Database.MigrateAsync();
                await Seed.SeedData(context);
           }
           catch (Exception ex)
           {
               
                var logger =Services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "An error occured during migration");
           }  

          await host.RunAsync();
           //end
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
