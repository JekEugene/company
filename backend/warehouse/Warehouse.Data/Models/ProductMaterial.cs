using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Warehouse.Data.Models
{
    public class ProductMaterial
    {
        public Guid ProductId { get; set; } 
        public Guid MaterialId { get; set; }
        public Product Product { get; set; }
        public Material Material { get; set; }
        public int MaterialCount { get; set; }
    }
}
