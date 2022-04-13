using PurchaseDepartment.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PurchaseDepartment.Data.Repositories.Abstracts
{
    public interface IPurchaseRepository
    {
        void CreatePurchase(Purchase purchase);
        void Save();
    }
}
