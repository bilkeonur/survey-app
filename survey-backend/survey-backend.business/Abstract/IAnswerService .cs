using survey_backend.data.DTO;
using survey_backend.entity;

namespace survey_backend.business.Abstract
{
    public interface IAnswerService
    {
        Task<Answer> CreateAsync(Answer entity);
        Task<List<Answer>> CreateRange(List<Answer> entities);
        Task<List<Answer>> GetAll();
        Task<Answer> GetById(int id);
        Task DeleteAsync(Answer entity);        
        Task UpdateAsync(Answer entityToUpdate, Answer entity);
        Task<List<StaticsByDateDTO>> GetStatisticsByDateRange(int surveyId);
        Task<List<StaticsByAnswersDTO>> GetStatisticsByAnswers(int surveyId);
    }
}