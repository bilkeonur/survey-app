using Microsoft.EntityFrameworkCore;
using survey_backend.data.Configurations;
using survey_backend.entity;

namespace survey_backend.data.Concrete.EfCore
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions options): base(options)
        {
            
        }

        public DbSet<AnswerType> AnswerTypes { get;set; }
        public DbSet<Organization> Organizations { get;set; }
        public DbSet<Question> Questions { get;set; }
        public DbSet<Survey> Surveys { get;set; }
        public DbSet<Option> Options { get;set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new AnswerTypeConfigurations());
            modelBuilder.ApplyConfiguration(new OrganizationConfigurations());
            modelBuilder.ApplyConfiguration(new QuestionConfigurations());
            modelBuilder.ApplyConfiguration(new SurveyConfigurations());
            modelBuilder.ApplyConfiguration(new OptionConfigurations());
            modelBuilder.Seed();      
        }
    }
}