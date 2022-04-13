using Microsoft.EntityFrameworkCore;
using PurchaseDepartment.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PurchaseDepartment.Data
{
    public class PurchaseDepartmentContext : DbContext
    {
        public PurchaseDepartmentContext(DbContextOptions options)
            : base(options)
        {

        }

        public DbSet<Purchase> Purchases { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=PurchaseDepartment;Trusted_Connection=True");
            optionsBuilder.LogTo(Console.WriteLine);
        }
    }
}
