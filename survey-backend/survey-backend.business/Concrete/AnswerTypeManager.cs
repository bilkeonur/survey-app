using survey_backend.business.Abstract;
using survey_backend.data.Abstract;
using survey_backend.entity;

namespace survey_backend.business.Concrete
{
    public class AnswerTypeManager: IAnswerTypeService

    {
        private readonly IUnitOfWork _unitofwork;
        public AnswerTypeManager(IUnitOfWork unitofwork)
        {
            _unitofwork = unitofwork;
        }

        public string ErrorMessage { get; set; }

        public async Task<AnswerType> CreateAsync(AnswerType entity)
        {
            await _unitofwork.AnswerTypes.CreateAsync(entity);
            await _unitofwork.SaveAsync();
            return entity;
        }

        public async Task<List<AnswerType>> GetAll()
        {
            return await _unitofwork.AnswerTypes.GetAll();
        }

        public async Task<AnswerType> GetById(int id)
        {
            return await _unitofwork.AnswerTypes.GetById(id);
        }

        public async Task UpdateAsync(AnswerType entityToUpdate, AnswerType entity)
        {
            entityToUpdate.Label = entity.Label;
            await _unitofwork.SaveAsync();
        }

        public async Task DeleteAsync(AnswerType entity)
        {
            _unitofwork.AnswerTypes.Delete(entity);
            await _unitofwork.SaveAsync();
        }

        public bool Validation(AnswerType entity)
        {
            var isValid = true;

            if(string.IsNullOrEmpty(entity.Label))
            {
                ErrorMessage += "Yanıt Tipi Girmelisiniz\n";
                isValid=false;
            }

            return isValid;
        }
    }
}