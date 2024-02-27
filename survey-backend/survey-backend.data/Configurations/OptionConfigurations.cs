using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using survey_backend.entity;

namespace survey_backend.data.Configurations
{
    public class OptionConfigurations : IEntityTypeConfiguration<Option>
    {
        public void Configure(EntityTypeBuilder<Option> builder)
        {
            builder.Property(m=>m.Label).IsRequired().HasMaxLength(80);
        }
    }
}