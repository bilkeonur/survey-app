using Microsoft.EntityFrameworkCore;
using survey_backend.data.Abstract;
using survey_backend.entity;

namespace survey_backend.data.Concrete.EfCore
{
    public class SurveyRepository : GenericRepository<Survey>, ISurveyRepository
    {
        public SurveyRepository(DataContext context) : base(context)
        {
        }

        private DataContext? DataContext
        {
            get {return _context as DataContext; }
        }

        public new async Task<List<Survey>> GetAll()
        {
            DateTime today = DateTime.Now.Date;

            var result = await _context.Set<Survey>()
                .Where(d => d.StartDate <= today && d.EndDate >= today)
                .Where(a => a.IsActive)
                .Include(i=>i.Organization)
                .ToListAsync();
            
            return result;
        }
    }
}