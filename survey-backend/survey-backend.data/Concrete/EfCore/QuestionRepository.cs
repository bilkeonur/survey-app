using Microsoft.EntityFrameworkCore;
using survey_backend.data.Abstract;
using survey_backend.entity;

namespace survey_backend.data.Concrete.EfCore
{
    public class QuestionRepository : GenericRepository<Question>, IQuestionRepository
    {
        public QuestionRepository(DataContext context) : base(context)
        {
        }

        private DataContext DataContext
        {
            get {return _context as DataContext; }
        }

        public async Task<List<Question>> GetBySurveyId(int id)
        {
            var result = await _context.Set<Question>()
                .Where(x => x.SurveyId == id)
                .Select(q => new Question {
                    Id = q.Id,
                    AnswerType = q.AnswerType,
                    IsMandatory = q.IsMandatory,
                    InputFormatId = q.InputFormatId,
                    InputFormatRule = q.InputFormatRule,
                    Text = q.Text,
                    Options = q.Options.Select(o => new Option {
                        Id = o.Id,
                        QuestionId = o.QuestionId,
                        Label = o.Label
                    }).ToList()
                })
                .ToListAsync();
            
            return result;
        }
    }
}