using Microsoft.EntityFrameworkCore;
using survey_backend.entity;

namespace survey_backend.data.Configurations
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder builder) 
        {
            List<AnswerType> answerTypes = new List<AnswerType>() {
                new AnswerType() {
                    Id = 1,
                    Name = "Çoktan Tekli Seçmeli"
                },
                new AnswerType() {
                    Id = 2,
                    Name = "Çoktan Çoklu Seçmeli"
                },
                new AnswerType() {
                    Id = 3,
                    Name = "Yazarak Yanıt Verilen"
                },
                new AnswerType() {
                    Id = 4,
                    Name = "Listeden Tek Seçilen"
                }
            };

            List<Organization> organizations = new List<Organization>() {
                new Organization() {
                    Id = 1,
                    Name = "Su Bilgi Teknolojileri"
                },
                new Organization() {
                    Id = 2,
                    Name = "Onr Bilgi Teknolojileri"
                }
            };

            List<Survey> surveys = new List<Survey>() {
                new Survey()
                {
                    Id = 1,
                    OrganizationId = 1,
                    Title = "Genel Anket 1",
                    StartDate = DateTime.Parse("2024-02-20 00:00:00,00"),
                    EndDate = DateTime.Parse("2024-02-22 00:00:00,00"),
                    IsActive = true
                },
                new Survey()
                {
                    Id = 2,
                    OrganizationId = 2,
                    Title = "Genel Anket 2",
                    StartDate = DateTime.Parse("2024-02-20 00:00:00,00"),
                    EndDate = DateTime.Parse("2024-02-22 00:00:00,00"),
                    IsActive = true
                }
            };

            List<Question> questions = new List<Question>() {
                new Question() {
                    Id = 1,
                    SurveyId = 1,
                    Text = "Çalıştığınız İşten Memnun musunuz?",
                    AnswerTypeId = 1,
                    IsMandatory = true
                },
                new Question() {
                    Id = 2,
                    SurveyId = 1,
                    Text = "Cinsiyetiniz",
                    AnswerTypeId = 1,
                    IsMandatory = false
                },
                new Question() {
                    Id = 3,
                    SurveyId = 1,
                    Text = "Sevdiğiniz Film Türleri",
                    AnswerTypeId = 2,
                    IsMandatory = true
                },
                new Question() {
                    Id = 4,
                    SurveyId = 1,
                    Text = "Sahip Olduğunuz Hayvanlar",
                    AnswerTypeId = 2,
                    IsMandatory = false
                },
                new Question() {
                    Id = 5,
                    SurveyId = 2,
                    Text = "Yaşınız",
                    AnswerTypeId = 3,
                    IsMandatory = true
                },
                new Question() {
                    Id = 6,
                    SurveyId = 2,
                    Text = "Bize İletmek İstediğiniz Mesaj",
                    AnswerTypeId = 3,
                    IsMandatory=false
                },
                new Question() {
                    Id = 7,
                    SurveyId = 2,
                    Text = "Doğum Tarihi",
                    AnswerTypeId = 3,
                    IsMandatory = true
                },
                new Question() {
                    Id = 8,
                    SurveyId = 2,
                    Text = "Yaşadığınız Şehir",
                    AnswerTypeId = 4,
                    IsMandatory = true
                },
            };

            builder.Entity<AnswerType>().HasData(answerTypes);
            builder.Entity<Organization>().HasData(organizations);
            builder.Entity<Question>().HasData(questions);
            builder.Entity<Survey>().HasData(surveys);
        }
    }
}