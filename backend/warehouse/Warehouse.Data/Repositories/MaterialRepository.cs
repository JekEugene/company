using System.Collections.Generic;
using System.Threading.Tasks;
using Warehouse.Data.Models;
using Warehouse.Data.Repositories.Abstracts;

namespace Warehouse.Data.Repositories
{
    public class MaterialRepository : IMaterialRepository
    {
        private readonly WarehouseContext _context;
        public MaterialRepository(WarehouseContext context)
        {
            _context = context;
        }
        public Task<List<Material>> GetListAsync()
        {
            throw new System.NotImplementedException();
        }
    }
}
