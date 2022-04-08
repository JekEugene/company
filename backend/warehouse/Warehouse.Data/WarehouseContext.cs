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
        }

        public DbSet<Material> Materials { get; set; }
        public DbSet<RawMaterial> RawMaterials { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductMaterial> ProductMaterials { get; set; }
        public DbSet<ProductRawMaterial> ProductRawMaterials { get; set; }
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
                    j.Property(pm => pm.MaterialCount);
                    j.HasKey(t => new { t.ProductId, t.MaterialId });
                    j.ToTable("ProductMaterial");
                });

            modelBuilder.Entity<Product>()
                .HasMany(p => p.RawMaterials)
                .WithMany(m => m.Products)
                .UsingEntity<ProductRawMaterial>(
                j => j
                .HasOne(pm => pm.RawMaterial)
                .WithMany(t => t.ProductRawMaterials)
                .HasForeignKey(pm => pm.RawMaterialId),
                j => j
                .HasOne(pm => pm.Product)
                .WithMany(t => t.ProductRawMaterials)
                .HasForeignKey(pm => pm.ProductId),
                j =>
                {
                    j.Property(pm1 => pm1.RawMaterialCount);
                    j.HasKey(t => new { t.ProductId, t.RawMaterialId });
                    j.ToTable("ProductRawMaterial");
                });
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=Warehouse;Trusted_Connection=True");
            optionsBuilder.LogTo(Console.WriteLine);
        }
    }
}
