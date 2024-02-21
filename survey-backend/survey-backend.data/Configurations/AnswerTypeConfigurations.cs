using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using survey_backend.entity;

namespace survey_backend.data.Configurations
{
    public class AnswerTypeConfigurations : IEntityTypeConfiguration<AnswerType>
    {
        public void Configure(EntityTypeBuilder<AnswerType> builder)
        {
            builder.Property(m=>m.Name).IsRequired().HasMaxLength(80);
        }
    }
}