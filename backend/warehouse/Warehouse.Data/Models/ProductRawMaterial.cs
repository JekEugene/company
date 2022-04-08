using System;
using System.ComponentModel.DataAnnotations;

namespace Warehouse.Data.Models
{
    public class ProductRawMaterial
    {
        public Guid ProductId { get; set; }
        public Guid RawMaterialId { get; set; }
        public Product Product { get; set; }
        public RawMaterial RawMaterial { get; set; }
        public int RawMaterialCount { get; set; }
    }
}
