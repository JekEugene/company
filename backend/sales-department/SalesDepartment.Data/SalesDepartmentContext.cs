using Microsoft.EntityFrameworkCore;
using SalesDepartment.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalesDepartment.Data
{
    public class SalesDepartmentContext : DbContext
    {
        public DbSet<Sale> Sales { get; set; }
        public SalesDepartmentContext(DbContextOptions options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=SalesDepartment;Trusted_Connection=True");
            optionsBuilder.LogTo(Console.WriteLine);
        }
    }
}
