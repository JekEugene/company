using System.Collections.Generic;
using System.Threading.Tasks;
using Warehouse.Data.Models;

namespace Warehouse.Data.Repositories.Abstracts
{
    public interface IProductRepository
    {
        Task<List<Product>> GetListAsync();
    }
}
