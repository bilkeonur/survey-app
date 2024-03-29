using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using survey_backend.data.Configurations;
using survey_backend.data.Extensions;
using survey_backend.entity;

namespace survey_backend.data.Concrete.EfCore
{
    public class DataContext: IdentityDbContext
    {
        public DataContext(DbContextOptions options): base(options)
        {
            
        }

        public DbSet<Answer> Answers { get;set; }
        public DbSet<Organization> Organizations { get;set; }
        public DbSet<Question> Questions { get;set; }
        public DbSet<Survey> Surveys { get;set; }
        public DbSet<Option> Options { get;set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<Answer>()
                .HasOne(e => e.Survey)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.ApplyConfiguration(new AnswerConfigurations());
            modelBuilder.ApplyConfiguration(new OrganizationConfigurations());
            modelBuilder.ApplyConfiguration(new QuestionConfigurations());
            modelBuilder.ApplyConfiguration(new SurveyConfigurations());
            modelBuilder.ApplyConfiguration(new OptionConfigurations());
            modelBuilder.Seed();      
        }
    }
}