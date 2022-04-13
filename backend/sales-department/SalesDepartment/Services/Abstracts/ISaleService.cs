using SalesDepartment.Models.ResponseModels;
using System.Threading.Tasks;

namespace SalesDepartment.Services.Abstracts
{
    public interface ISaleService
    {
        Task<ApiResult> MakeSale(int id);
    }
}
