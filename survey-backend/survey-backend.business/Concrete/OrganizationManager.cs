using survey_backend.business.Abstract;
using survey_backend.data.Abstract;
using survey_backend.entity;

namespace survey_backend.business.Concrete
{
    public class OrganizationManager: IOrganizationService

    {
        private readonly IUnitOfWork _unitofwork;
        public OrganizationManager(IUnitOfWork unitofwork)
        {
            _unitofwork = unitofwork;
        }

        public string ErrorMessage { get; set; }

        public async Task<Organization> CreateAsync(Organization entity)
        {
            await _unitofwork.Organizations.CreateAsync(entity);
            await _unitofwork.SaveAsync();
            return entity;
        }

        public async Task<List<Organization>> GetAll()
        {
            return await _unitofwork.Organizations.GetAll();
        }

        public async Task<Organization> GetById(int id)
        {
            return await _unitofwork.Organizations.GetById(id);
        }

        public async Task UpdateAsync(Organization entityToUpdate, Organization entity)
        {
            entityToUpdate.Name = entity.Name;
            await _unitofwork.SaveAsync();
        }

        public async Task DeleteAsync(Organization entity)
        {
            _unitofwork.Organizations.Delete(entity);
            await _unitofwork.SaveAsync();
        }

        public bool Validation(Organization entity)
        {
            var isValid = true;

            if(string.IsNullOrEmpty(entity.Name))
            {
                ErrorMessage += "Organizasyon Adı Girmelisiniz\n";
                isValid=false;
            }

            return isValid;
        }
    }
}