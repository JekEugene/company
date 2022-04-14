using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Warehouse.Models
{
    public class MaterialCreateDTO
    {
        [Required]
        public string Name { get; set; }
        
        public int Quantity { get; set; }
        [Required]
        public double Cost { get; set; }

    }
}
