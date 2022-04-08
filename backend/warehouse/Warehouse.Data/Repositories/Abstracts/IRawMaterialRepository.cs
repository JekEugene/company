using System.Collections.Generic;
using System.Threading.Tasks;
using Warehouse.Data.Models;

namespace Warehouse.Data.Repositories.Abstracts
{
    public interface IRawMaterialRepository
    {
        Task<List<RawMaterial>> GetListAsync();
    }
}
