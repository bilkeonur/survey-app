using Microsoft.EntityFrameworkCore;
using survey_backend.data.Abstract;
using survey_backend.data.DTO;
using survey_backend.entity;

namespace survey_backend.data.Concrete.EfCore
{
    public class AnswerRepository : GenericRepository<Answer>, IAnswerRepository
    {
        public AnswerRepository(DataContext context) : base(context)
        {
        }

        private DataContext DataContext
        {
            get {return _context as DataContext; }
        }

        public async Task CreateRange(List<Answer> entities)
        {
            await _context.Set<Answer>().AddRangeAsync(entities);
        }

        public async Task<List<Answer>> GetByQuestionId(int id)
        {
            return await _context.Set<Answer>()
            .Where(x => x.QuestionId == id)
            .ToListAsync();
        }

        public async Task<List<Answer>> GetBySurveyId(int id)
        {
            return await _context.Set<Answer>()
            .Where(x => x.SurveyId == id)
            .ToListAsync();
        }

        public async Task<List<StaticsByDateDTO>> GetStatisticsByDateRange(int surveyId)
        {
            return await _context.Set<Answer>()
                .Where(ans => ans.SurveyId == surveyId)
                .GroupBy(ans => ans.CreatedDate)
                .Select(res => new StaticsByDateDTO{ SurveyId = surveyId, ParticipationDate = res.Key.ToString("dd.MM.yyyy"), ParticipationCount = res.Count() })
                .ToListAsync();
        }
        public async Task<List<StaticsByAnswersDTO>> GetStatisticsByAnswers(int surveyId)
        {
            /*return await _context.Set<Answer>()
                .Where(ans => ans.SurveyId == surveyId)
                .Where(ans => ans.Question!.AnswerTypeId == 1)
                .GroupBy(ans => ans.QuestionId)
                .Select(res => new StaticsByAnswersDTO {
                    QuestionId = res.Key,
                    QuestionText = res.
                    Options = new List<OptionDTO>()
                })
                .ToListAsync();*/

            var o1 = new OptionDTO{Name="Evet",Count=5};
            var o2 = new OptionDTO{Name="Hayır",Count=8};
            var o3 = new OptionDTO{Name="Erkek",Count=3};
            var o4 = new OptionDTO{Name="Kadın",Count=3};
            var o5 = new OptionDTO{Name="Bilim Kurgu",Count=10};
            var o6 = new OptionDTO{Name="Komedi",Count=20};
            var o7 = new OptionDTO{Name="Aksiyon",Count=5};

            var l1 = new List<OptionDTO>(){o1,o2};
            var l2 = new List<OptionDTO>(){o3,o4};
            var l3 = new List<OptionDTO>(){o5,o6,o7};

            var a1 = new StaticsByAnswersDTO{QuestionId=1,QuestionText="Çalıştığınız İşten Memnun musunuz?",Options=l1};
            var a2 = new StaticsByAnswersDTO{QuestionId=2,QuestionText="Cinsiyetiniz",Options=l2};
            var a3 = new StaticsByAnswersDTO{QuestionId=3,QuestionText="Sevdiğiniz Film Türleri",Options=l3};

            var w1 = new List<StaticsByAnswersDTO>{a1,a2,a3};

            return w1;
        }
    }
}