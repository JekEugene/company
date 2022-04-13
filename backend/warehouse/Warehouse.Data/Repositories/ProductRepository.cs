using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
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
        public void CreateProduct(Product product)
        {
            _context.Products.Add(product);
        }

        public void DeleteProduct(Product product)
        {
            _context.Products.Remove(product);
        }

        public async Task<Product> GetProductByIdAsync(int id)
            => await _context.Products
            .Include(p => p.Materials)
            .Include(p => p.ProductMaterials)
            .Where(p => p.Id == id)
            .FirstOrDefaultAsync();

        public async Task<List<Product>> GetProductsAsync()
            => await _context.Products
            .Include(p => p.Materials)
            .Include(p => p.ProductMaterials)
            .ToListAsync();

        public void Save() => _context.SaveChanges();
    }
}
