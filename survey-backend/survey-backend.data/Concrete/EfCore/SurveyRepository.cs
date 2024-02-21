using survey_backend.data.Abstract;
using survey_backend.entity;

namespace survey_backend.data.Concrete.EfCore
{
    public class SurveyRepository : GenericRepository<Survey>, ISurveyRepository
    {
        public SurveyRepository(DataContext context) : base(context)
        {
        }

        private DataContext DataContext
        {
            get {return _context as DataContext; }
        }
    }
}