using Microsoft.EntityFrameworkCore;
using survey_backend.data.Abstract;
using survey_backend.entity;

namespace survey_backend.data.Concrete.EfCore
{
    public class OptionRepository : GenericRepository<Option>, IOptionRepository
    {
        public OptionRepository(DataContext context) : base(context)
        {
        }

        private DataContext DataContext
        {
            get {return _context as DataContext; }
        }

        public async Task CreateRange(List<Option> entities)
        {
            await _context.Set<Option>().AddRangeAsync(entities);
        }

        public async Task<List<Option>> GetByQuestionId(int id)
        {
            return await _context.Set<Option>()
            .Where(x => x.QuestionId == id)
            .ToListAsync();
        }
    }
}