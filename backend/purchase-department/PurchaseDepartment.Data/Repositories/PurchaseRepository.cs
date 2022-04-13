using PurchaseDepartment.Data.Models;
using PurchaseDepartment.Data.Repositories.Abstracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PurchaseDepartment.Data.Repositories
{
    public class PurchaseRepository : IPurchaseRepository
    {
        private readonly PurchaseDepartmentContext _context;
        public PurchaseRepository(PurchaseDepartmentContext context)
        {
            _context = context;
        }
        public void CreatePurchase(Purchase purchase)
        {
            _context.Purchases.Add(purchase);
        }

        public void Save() => _context.SaveChanges();
    }
}
