using Microsoft.EntityFrameworkCore;
using System;
using Warehouse.Data.Models;

namespace Warehouse.Data
{
    public class WarehouseContext : DbContext
    {
        public WarehouseContext(DbContextOptions options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Material> Materials { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductMaterial> ProductMaterials { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .HasMany(p => p.Materials)
                .WithMany(m => m.Products)
                .UsingEntity<ProductMaterial>(
                j => j
                .HasOne(pm => pm.Material)
                .WithMany(t => t.ProductMaterials)
                .HasForeignKey(pm => pm.MaterialId),
                j => j
                .HasOne(pm => pm.Product)
                .WithMany(t => t.ProductMaterials)
                .HasForeignKey(pm => pm.ProductId),
                j =>
                {
                    j.Property(pm => pm.Count);
                    j.HasKey(t => new { t.ProductId, t.MaterialId });
                    j.ToTable("ProductMaterial");
                });
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=Warehouse;Trusted_Connection=True");
            optionsBuilder.LogTo(Console.WriteLine);
        }
    }
}
