using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Warehouse.Models
{
    public class ProductMaterialDTO
    {
        public int ProductId { get; set; }
        public int MaterialId { get; set; }
        public int Count { get; set; }
    }
}
