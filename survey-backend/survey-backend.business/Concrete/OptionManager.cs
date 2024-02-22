using survey_backend.business.Abstract;
using survey_backend.data.Abstract;
using survey_backend.entity;

namespace survey_backend.business.Concrete
{
    public class OptionManager: IOptionService
    {
        private readonly IUnitOfWork _unitofwork;
        
        public OptionManager(IUnitOfWork unitofwork)
        {
            _unitofwork = unitofwork;
        }

        public string ErrorMessage { get; set; }

        public async Task<Option> CreateAsync(Option entity)
        {
            await _unitofwork.Options.CreateAsync(entity);
            await _unitofwork.SaveAsync();
            return entity;
        }

        public async Task<List<Option>> GetAll()
        {
            return await _unitofwork.Options.GetAll();
        }

        public async Task<Option> GetById(int id)
        {
            return await _unitofwork.Options.GetById(id);
        }

        public async Task<List<Option>> GetByQuestionId(int id)
        {
            return await _unitofwork.Options.GetByQuestionId(id);
        }

        public async Task UpdateAsync(Option entityToUpdate, Option entity)
        {
            entityToUpdate.Text = entity.Text;
            await _unitofwork.SaveAsync();
        }

        public async Task DeleteAsync(Option entity)
        {
            _unitofwork.Options.Delete(entity);
            await _unitofwork.SaveAsync();
        }

        public bool Validation(Option entity)
        {
            var isValid = true;

            if(string.IsNullOrEmpty(entity.Text))
            {
                ErrorMessage += "Cevap Girmelisiniz\n";
                isValid=false;
            }

            return isValid;
        }
    }
}