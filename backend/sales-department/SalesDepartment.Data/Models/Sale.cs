using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalesDepartment.Data.Models
{
    public class Sale
    {
        public int Id { get; set; }
        public string ClientName { get; set; }
        public DateTime Date { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public string Message { get; set; }
        public bool Successfull { get; set; }
    }
}
