using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PurchaseDepartment.Data;
using PurchaseDepartment.Data.Repositories;
using PurchaseDepartment.Data.Repositories.Abstracts;

namespace PurchaseDepartment.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureCors(this IServiceCollection services) =>
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>
                builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());
            });
        public static void ConfigureSqlContext(this IServiceCollection services, IConfiguration configuration) =>
            services.AddDbContext<PurchaseDepartmentContext>(opts =>
            opts.UseSqlServer(configuration.GetConnectionString("sqlConnection"),
            b => b.MigrationsAssembly("PurchaseDepartment")));

        public static void RegisterRepositories(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IPurchaseRepository, PurchaseRepository>();
        }
    }
}
