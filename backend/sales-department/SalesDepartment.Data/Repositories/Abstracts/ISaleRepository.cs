using SalesDepartment.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalesDepartment.Data.Repositories.Abstracts
{
    public interface ISaleRepository
    {
        void CreateSale(Sale sale);
        void Save();
    }
}
