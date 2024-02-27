using survey_backend.entity;

namespace survey_backend.data.Abstract
{
    public interface IAnswerRepository: IRepository<Answer>
    {
       Task CreateRange(List<Answer> entities);
       Task<List<Answer>> GetBySurveyId(int id);
       Task<List<Answer>> GetByQuestionId(int id);
       Task<object> CalculateStatics();
    }
}