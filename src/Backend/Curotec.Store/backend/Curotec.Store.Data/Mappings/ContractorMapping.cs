using Curotec.Store.Business.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Curotec.Store.Data.Mappings
{
    public class ContractorMapping : IEntityTypeConfiguration<Contractor>
    {
        public void Configure(EntityTypeBuilder<Contractor> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(p => p.Name)
                .IsRequired()
                .HasColumnType("varchar(200)");

            builder.Property(p => p.Document)
                .IsRequired()
                .HasColumnType("varchar(14)");

            // 1 : 1 => Contractor : Address
            builder.HasOne(f => f.Address)
                .WithOne(e => e.Contractor);

            // 1 : N => Contractor : Products
            builder.HasMany(f => f.Products)
                .WithOne(p => p.Contractor)
                .HasForeignKey(p => p.ContractorId);

            builder.ToTable("Contractors");
        }
    }
}
