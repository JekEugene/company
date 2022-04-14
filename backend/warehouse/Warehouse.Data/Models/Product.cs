using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Warehouse.Data.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Cost { get; set; }
        public int Quantity { get; set; }
        [JsonIgnore]
        public List<Material> Materials { get; set; }
        [JsonIgnore]
        public List<ProductMaterial> ProductMaterials { get; set; }
    }
}
