using System.Threading.Tasks;
using Warehouse.Data.Repositories.Abstracts;
using System.Linq;

namespace Warehouse.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repository;
        public ProductService(IProductRepository repository)
        {
            _repository = repository;
        }
        public async Task<bool> ProduceProduct(int id, int quantity)
        {
            var pms = await _repository.GetProductMaterialByIdAsync(id);
            foreach(var item in pms)
            {
                if(item.Count*quantity > item.Material.Quantity)
                {
                    return false;
                }

                item.Material.Quantity -= item.Count*quantity;
            }

            pms.FirstOrDefault().Product.Quantity += quantity;

            _repository.Save();
            return true;
        }
    }
}
