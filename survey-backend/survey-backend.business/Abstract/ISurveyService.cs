using survey_backend.entity;

namespace survey_backend.business.Abstract
{
    public interface ISurveyService: IValidator<Survey>
    {
        Task<Survey> CreateAsync(Survey entity);
        Task<List<Survey>> GetAll();
        Task<Survey> GetById(int id);
        Task DeleteAsync(Survey entity);        
        Task UpdateAsync(Survey entityToUpdate, Survey entity);
    }
}