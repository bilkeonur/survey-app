using survey_backend.entity;

namespace survey_backend.business.Abstract
{
    public interface IOrganizationService: IValidator<Organization>
    {
        Task<Organization> CreateAsync(Organization entity);
        Task<List<Organization>> GetAll();
        Task<Organization> GetById(int id);
        Task DeleteAsync(Organization entity);        
        Task UpdateAsync(Organization entityToUpdate, Organization entity);
    }
}