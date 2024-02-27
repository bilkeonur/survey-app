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

        public async Task<object> CalculateStatics()
        {
            return await _context.Set<Answer>()
            .GroupBy(r => new { r.SurveyId, r.QuestionId, r.Id })
            .Select(group => new
            {
                SurveyId = group.Key.SurveyId,
                QuestionId = group.Key.QuestionId,
                SelOptionId = group.Key.Id,
                TotalResponses = group.Count(),
            })
            .ToListAsync();
        }
    }
}