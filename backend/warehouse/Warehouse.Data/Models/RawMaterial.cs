using System;
using System.Collections.Generic;

namespace Warehouse.Data.Models
{
    public class RawMaterial
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public double Cost { get; set; }
        public List<Product> Products { get; set; }
        public List<ProductRawMaterial> ProductRawMaterials { get; set; }
    }
}
