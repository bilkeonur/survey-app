using survey_backend.entity;

namespace survey_backend.business.Abstract
{
    public interface IOptionService: IValidator<Option>
    {
        Task<Option> CreateAsync(Option entity);
        Task<List<Option>> GetAll();
        Task<Option> GetById(int id);
        Task<List<Option>> GetByQuestionId(int id);
        Task DeleteAsync(Option entity);        
        Task UpdateAsync(Option entityToUpdate, Option entity);
    }
}