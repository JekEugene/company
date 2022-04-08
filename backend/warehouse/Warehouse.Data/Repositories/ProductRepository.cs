using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Warehouse.Data.Models;
using Warehouse.Data.Repositories.Abstracts;

namespace Warehouse.Data.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly WarehouseContext _context;
        public ProductRepository(WarehouseContext context)
        {
            _context = context;
        }
        public async Task<List<Product>> GetListAsync()
            => await _context.Products
            .Include(p=>p.Materials)
            .Include(p=>p.RawMaterials)
            .ToListAsync();
    }
}
