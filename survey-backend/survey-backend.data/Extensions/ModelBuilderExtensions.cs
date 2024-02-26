using Microsoft.EntityFrameworkCore;
using survey_backend.entity;

namespace survey_backend.data.Extensions
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
                    IsMandatory = true,
                    InputFormatId = 1,
                },
                new Question() {
                    Id = 2,
                    SurveyId = 1,
                    Text = "Cinsiyetiniz",
                    AnswerTypeId = 1,
                    IsMandatory = false,
                    InputFormatId = 1
                },
                new Question() {
                    Id = 3,
                    SurveyId = 1,
                    Text = "Sevdiğiniz Film Türleri",
                    AnswerTypeId = 2,
                    IsMandatory = true,
                    InputFormatId = 1
                },
                new Question() {
                    Id = 4,
                    SurveyId = 1,
                    Text = "Sahip Olduğunuz Hayvanlar",
                    AnswerTypeId = 2,
                    IsMandatory = false,
                    InputFormatId = 1
                },
                new Question() {
                    Id = 5,
                    SurveyId = 2,
                    Text = "Yaşınız",
                    AnswerTypeId = 3,
                    IsMandatory = true,
                    InputFormatId = 2,
                    InputFormatRule = "{\"min\":18,\"max\":65}"
                },
                new Question() {
                    Id = 6,
                    SurveyId = 2,
                    Text = "Bize İletmek İstediğiniz Mesaj",
                    AnswerTypeId = 3,
                    IsMandatory=false,
                    InputFormatId = 3,
                    InputFormatRule = "{\"max\":200}"
                },
                new Question() {
                    Id = 7,
                    SurveyId = 2,
                    Text = "Doğum Tarihi",
                    AnswerTypeId = 3,
                    IsMandatory = true,
                    InputFormatId = 4,
                    InputFormatRule = "{\"pattern\":\"gg\\aa\\yyyy\"}"
                },
                new Question() {
                    Id = 8,
                    SurveyId = 2,
                    Text = "Yaşadığınız Şehir",
                    AnswerTypeId = 4,
                    IsMandatory = true,
                    InputFormatId = 1
                },
            };

            List<Option> options = new List<Option>() {
                new Option() {
                    Id = 1,
                    QuestionId = 1,
                    Text = "Evet"
                },
                new Option() {
                    Id = 2,
                    QuestionId = 1,
                    Text = "Hayır"
                },
                new Option() {
                    Id = 3,
                    QuestionId = 2,
                    Text = "Kadın"
                },
                new Option() {
                    Id = 4,
                    QuestionId = 2,
                    Text = "Erkek"
                },
                new Option() {
                    Id = 5,
                    QuestionId = 3,
                    Text = "Vahşi Batı"
                },
                new Option() {
                    Id = 6,
                    QuestionId = 3,
                    Text = "Bilim Kurgu"
                },
                new Option() {
                    Id = 7,
                    QuestionId = 3,
                    Text = "Komedi"
                },
                new Option() {
                    Id = 8,
                    QuestionId = 4,
                    Text = "Kedi"
                },
                new Option() {
                    Id = 9,
                    QuestionId = 4,
                    Text = "Köpek"
                },
                new Option() {
                    Id = 10,
                    QuestionId = 4,
                    Text = "Kuş"
                },
                new Option() {
                    Id = 11,
                    QuestionId = 8,
                    Text = "Ankara"
                },
                new Option() {
                    Id = 12,
                    QuestionId = 8,
                    Text = "İstanbul"
                }
                ,
                new Option() {
                    Id = 13,
                    QuestionId = 8,
                    Text = "İzmir"
                }
            };

            builder.Entity<AnswerType>().HasData(answerTypes);
            builder.Entity<Organization>().HasData(organizations);
            builder.Entity<Question>().HasData(questions);
            builder.Entity<Survey>().HasData(surveys);
            builder.Entity<Option>().HasData(options);
        }
    }
}