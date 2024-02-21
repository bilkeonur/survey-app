using survey_backend.business.Abstract;
using survey_backend.data.Abstract;
using survey_backend.entity;

namespace survey_backend.business.Concrete
{
    public class SurveyManager: ISurveyService

    {
        private readonly IUnitOfWork _unitofwork;
        public SurveyManager(IUnitOfWork unitofwork)
        {
            _unitofwork = unitofwork;
        }

        public string ErrorMessage { get; set; }

        public async Task<Survey> CreateAsync(Survey entity)
        {
            await _unitofwork.Surveys.CreateAsync(entity);
            await _unitofwork.SaveAsync();
            return entity;
        }

        public async Task<List<Survey>> GetAll()
        {
            return await _unitofwork.Surveys.GetAll();
        }

        public async Task<Survey> GetById(int id)
        {
            return await _unitofwork.Surveys.GetById(id);
        }

        public async Task UpdateAsync(Survey entityToUpdate, Survey entity)
        {
            entityToUpdate.Title = entity.Title;
            await _unitofwork.SaveAsync();
        }

        public async Task DeleteAsync(Survey entity)
        {
            _unitofwork.Surveys.Delete(entity);
            await _unitofwork.SaveAsync();
        }

        public bool Validation(Survey entity)
        {
            var isValid = true;

            if(string.IsNullOrEmpty(entity.Title))
            {
                ErrorMessage += "Anket Başlığı Girmelisiniz\n";
                isValid=false;
            }

            return isValid;
        }
    }
}