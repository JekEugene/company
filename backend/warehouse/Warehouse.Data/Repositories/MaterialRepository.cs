using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
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
        public void CreateMaterial(Material material)
        {
            _context.Materials.Add(material);
        }

        public void DeleteMaterial(Material material)
        {
            _context.Materials.Remove(material);
        }

        public async Task<Material> GetMaterialByIdAsync(int id)
            => await _context.Materials
            .Include(m => m.Products)
            .Where(m => m.Id == id)
            .FirstOrDefaultAsync();

        public async Task<List<Material>> GetMaterialsAsync()
            => await _context.Materials
            .Include(m => m.Products)
            .ToListAsync();

        public void Save() => _context.SaveChanges();
    }
}
