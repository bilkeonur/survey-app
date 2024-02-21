using survey_backend.entity;

namespace survey_backend.business.Abstract
{
    public interface IAnswerTypeService: IValidator<AnswerType>
    {
        Task<AnswerType> CreateAsync(AnswerType entity);
        Task<List<AnswerType>> GetAll();
        Task<AnswerType> GetById(int id);
        Task DeleteAsync(AnswerType entity);        
        Task UpdateAsync(AnswerType entityToUpdate, AnswerType entity);
    }
}