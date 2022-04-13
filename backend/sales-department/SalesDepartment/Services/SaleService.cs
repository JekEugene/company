using SalesDepartment.Data.Repositories.Abstracts;
using SalesDepartment.Models.ResponseModels;
using SalesDepartment.Services.Abstracts;
using System.Threading.Tasks;

namespace SalesDepartment.Services
{
    public class SaleService : ISaleService
    {
        private readonly ISaleRepository _saleRepository;
        public SaleService(ISaleRepository saleRepository)
        {
            _saleRepository = saleRepository;
        }

        public Task<ApiResult> MakeSale(int id)
        {
            throw new System.NotImplementedException();
        }
    }
}
