using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Warehouse.Data;
using Warehouse.Data.Repositories;
using Warehouse.Data.Repositories.Abstracts;

namespace Warehouse.Extensions
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
            services.AddDbContext<WarehouseContext>(opts =>
            opts.UseSqlServer(configuration.GetConnectionString("sqlConnection"),
            b => b.MigrationsAssembly("Warehouse")));

        public static void RegisterRepositories(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IMaterialRepository, MaterialRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();
        }
    }
}
