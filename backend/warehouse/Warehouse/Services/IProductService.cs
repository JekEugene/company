using System.Threading.Tasks;

namespace Warehouse.Services
{
    public interface IProductService
    {
        Task<bool> ProduceProduct(int id, int quantity);
    }
}
