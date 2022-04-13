using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SalesDepartment.Data;
using SalesDepartment.Data.Repositories;
using SalesDepartment.Data.Repositories.Abstracts;

namespace SalesDepartment.Extensions
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
            services.AddDbContext<SalesDepartmentContext>(opts =>
            opts.UseSqlServer(configuration.GetConnectionString("sqlConnection"),
            b => b.MigrationsAssembly("Warehouse")));

        public static void RegisterRepositories(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<ISaleRepository, SaleRepository>();
        }
    }
}
