using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Warehouse.Data.Models
{
    public class Material
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public double Cost { get; set; }
        [JsonIgnore]
        public List<Product> Products { get; set; }
        [JsonIgnore]
        public List<ProductMaterial> ProductMaterials { get; set; }
    }
}