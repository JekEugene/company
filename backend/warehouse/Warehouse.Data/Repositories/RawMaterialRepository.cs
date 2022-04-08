using System.Collections.Generic;
using System.Threading.Tasks;
using Warehouse.Data.Models;
using Warehouse.Data.Repositories.Abstracts;

namespace Warehouse.Data.Repositories
{
    public class RawMaterialRepository : IRawMaterialRepository
    {
        private readonly WarehouseContext _context;
        public RawMaterialRepository(WarehouseContext context)
        {
            _context = context;
        }

        public Task<List<RawMaterial>> GetListAsync()
        {
            throw new System.NotImplementedException();
        }
    }
}
