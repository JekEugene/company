using SalesDepartment.Data.Models;
using SalesDepartment.Data.Repositories.Abstracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalesDepartment.Data.Repositories
{
    public class SaleRepository : ISaleRepository
    {
        private readonly SalesDepartmentContext _context;
        public SaleRepository(SalesDepartmentContext context)
        {
            _context = context;
        }

        public void CreateSale(Sale sale)
        {
            _context.Sales.Add(sale);
        }

        public void Save() => _context.SaveChanges();
    }
}
