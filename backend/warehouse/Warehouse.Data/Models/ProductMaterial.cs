using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Warehouse.Data.Models
{
    public class ProductMaterial
    {
        public int MaterialId { get; set; }
        public int ProductId { get; set; }
        public Material Material { get; set; }
        public Product Product { get; set; }
        public int Count { get; set; }
    }
}
