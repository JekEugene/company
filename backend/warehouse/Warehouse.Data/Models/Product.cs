using System;
using System.Collections.Generic;

namespace Warehouse.Data.Models
{
    public class Product
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public double Cost { get; set; }
        public List<Material> Materials { get; set; }
        public List<RawMaterial> RawMaterials { get; set; }
        public List<ProductRawMaterial> ProductRawMaterials { get; set;}
        public List<ProductMaterial> ProductMaterials { get; set; }
    }
}
