using survey_backend.entity;

namespace survey_backend.business.Abstract
{
    public interface IQuestionService: IValidator<Question>
    {
        Task<Question> CreateAsync(Question entity);
        Task<List<Question>> GetAll();
        Task<Question> GetById(int id);
        Task<List<Question>> GetBySurveyId(int id);
        Task DeleteAsync(Question entity);        
        Task UpdateAsync(Question entityToUpdate, Question entity);
    }
}