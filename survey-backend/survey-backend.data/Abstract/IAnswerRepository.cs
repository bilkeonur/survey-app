using survey_backend.data.DTO;
using survey_backend.entity;

namespace survey_backend.data.Abstract
{
    public interface IAnswerRepository: IRepository<Answer>
    {
       Task CreateRange(List<Answer> entities);
       Task<List<Answer>> GetBySurveyId(int id);
       Task<List<Answer>> GetByQuestionId(int id);
       Task<List<StaticsByDateDTO>> GetStatisticsByDateRange(int surveyId);
       Task<List<StaticsByAnswersDTO>> GetStatisticsByAnswers(int surveyId);
    }
}