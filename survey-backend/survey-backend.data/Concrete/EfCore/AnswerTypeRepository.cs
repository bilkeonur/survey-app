using survey_backend.data.Abstract;
using survey_backend.entity;

namespace survey_backend.data.Concrete.EfCore
{
    public class AnswerTypeRepository : GenericRepository<AnswerType>, IAnswerTypeRepository
    {
        public AnswerTypeRepository(DataContext context) : base(context)
        {
        }

        private DataContext DataContext
        {
            get {return _context as DataContext; }
        }
    }
}