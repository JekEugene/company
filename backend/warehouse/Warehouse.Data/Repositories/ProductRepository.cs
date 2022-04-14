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

        public void AddProductMaterial(ProductMaterial productMaterial)
        {
            _context.ProductMaterials.Add(productMaterial);
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
            .IgnoreAutoIncludes()
            .Where(p => p.Id == id)
            .FirstOrDefaultAsync();

        public async Task<List<ProductMaterial>> GetProductMaterialByIdAsync(int id)
            => await _context.ProductMaterials.Where(pm=>pm.ProductId == id)
                .Include(pm=>pm.Product)
                .Include(pm => pm.Material)
                .ToListAsync();

        public async Task<List<Product>> GetProductsAsync()
            => await _context.Products
            .Include(p => p.Materials)
            .IgnoreAutoIncludes()
            .ToListAsync();


        public void Save() => _context.SaveChanges();
    }
}
