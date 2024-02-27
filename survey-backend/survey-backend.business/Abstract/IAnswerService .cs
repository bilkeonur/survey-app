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
        Task<object> CalculateStatics();
    }
}