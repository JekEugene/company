using System.Collections.Generic;
using System.Threading.Tasks;
using Warehouse.Data.Models;

namespace Warehouse.Data.Repositories.Abstracts
{
    public interface IProductRepository
    {
        Task<List<Product>> GetProductsAsync();
        Task<Product> GetProductByIdAsync(int id);
        Task<List<ProductMaterial>> GetProductMaterialByIdAsync(int id);
        void CreateProduct(Product product);
        void DeleteProduct(Product product);
        void AddProductMaterial(ProductMaterial productMaterial);
        void Save();
    }
}
