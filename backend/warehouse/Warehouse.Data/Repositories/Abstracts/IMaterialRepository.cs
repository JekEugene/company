using System.Collections.Generic;
using System.Threading.Tasks;
using Warehouse.Data.Models;

namespace Warehouse.Data.Repositories.Abstracts
{
    public interface IMaterialRepository
    {
        Task<List<Material>> GetMaterialsAsync();
        Task<Material> GetMaterialByIdAsync(int id);
        void CreateMaterial(Material material);
        void DeleteMaterial(Material material);
        void Save();
    }
}
