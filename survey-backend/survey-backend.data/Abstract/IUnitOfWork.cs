namespace survey_backend.data.Abstract
{
    public interface IUnitOfWork: IDisposable
    {
        IAnswerTypeRepository AnswerTypes { get; }
        IOrganizationRepository Organizations { get; }
        IQuestionRepository Questions { get; }
        ISurveyRepository Surveys { get; }
        Task<int> SaveAsync();
    }
}