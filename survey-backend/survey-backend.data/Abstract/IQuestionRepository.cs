using survey_backend.entity;

namespace survey_backend.data.Abstract
{
    public interface IQuestionRepository: IRepository<Question>
    {
       Task<List<Question>> GetBySurveyId(int id);
    }
}