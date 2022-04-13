using PurchaseDepartment.Data.Models;
using PurchaseDepartment.Data.Repositories.Abstracts;
using PurchaseDepartment.Services.Abstracts;

namespace PurchaseDepartment.Services
{
    public class PurchaseService : IPurchaseService
    {
        private readonly IPurchaseRepository _purchaseRepository;
        public PurchaseService(IPurchaseRepository purchaseRepository)
        {
            _purchaseRepository = purchaseRepository;
        }


    }
}
