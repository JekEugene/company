using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Warehouse.Data;

namespace Warehouse.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureSqlContext(this IServiceCollection services, IConfiguration configuration) =>
            services.AddDbContext<WarehouseContext>(opts =>
            opts.UseSqlServer(configuration.GetConnectionString("sqlConnection"),
            b => b.MigrationsAssembly("Warehouse")));
    }
}
