using System.Collections.Generic;
using System.Threading.Tasks;
using Warehouse.Data.Models;

namespace Warehouse.Data.Repositories.Abstracts
{
    public interface IMaterialRepository
    {
        Task<List<Material>> GetListAsync();
    }
}
