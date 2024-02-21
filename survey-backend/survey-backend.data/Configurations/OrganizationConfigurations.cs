using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using survey_backend.entity;

namespace survey_backend.data.Configurations
{
    public class OrganizationConfigurations: IEntityTypeConfiguration<Organization>
    {
        public void Configure(EntityTypeBuilder<Organization> builder)
        {
            builder.Property(m=>m.Name).IsRequired().HasMaxLength(80);
        }
    }
}