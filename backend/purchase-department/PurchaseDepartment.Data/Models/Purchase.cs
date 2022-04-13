using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PurchaseDepartment.Data.Models
{
    public class Purchase
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int MaterialId { get; set; }
        public int Quantity { get; set; }
        public string Message { get; set; }
        public bool Successfull { get; set; }
    }
}
