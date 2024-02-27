using survey_backend.data.Abstract;
using survey_backend.entity;

namespace survey_backend.data.Concrete.EfCore
{
    public class UnitOfWork: IUnitOfWork
    {
        private readonly DataContext _context;

        public UnitOfWork(DataContext context)
        {
            _context = context;
        }

        private AnswerRepository _answerRepository;
        public IAnswerRepository Answers => _answerRepository ?? new AnswerRepository(_context);

        private AnswerTypeRepository _answerTypeRepository;
        public IAnswerTypeRepository AnswerTypes => _answerTypeRepository ?? new AnswerTypeRepository(_context);

        private OrganizationRepository _organizationRepository;
        public IOrganizationRepository Organizations => _organizationRepository ?? new OrganizationRepository(_context);

        private QuestionRepository _questionRepository;
        public IQuestionRepository Questions => _questionRepository ?? new QuestionRepository(_context);


        private SurveyRepository _surveyRepository;
        public ISurveyRepository Surveys => _surveyRepository ?? new SurveyRepository(_context);

        private OptionRepository _optionRepository;
        public IOptionRepository Options => _optionRepository ?? new OptionRepository(_context);

        public void Dispose()
        {
            _context.Dispose();
        }

        public async Task<int> SaveAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}