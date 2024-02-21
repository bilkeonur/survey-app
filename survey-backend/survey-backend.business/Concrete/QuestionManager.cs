using survey_backend.business.Abstract;
using survey_backend.data.Abstract;
using survey_backend.entity;

namespace survey_backend.business.Concrete
{
    public class QuestionManager: IQuestionService

    {
        private readonly IUnitOfWork _unitofwork;
        public QuestionManager(IUnitOfWork unitofwork)
        {
            _unitofwork = unitofwork;
        }

        public string ErrorMessage { get; set; }

        public async Task<Question> CreateAsync(Question entity)
        {
            await _unitofwork.Questions.CreateAsync(entity);
            await _unitofwork.SaveAsync();
            return entity;
        }

        public async Task<List<Question>> GetAll()
        {
            return await _unitofwork.Questions.GetAll();
        }

        public async Task<Question> GetById(int id)
        {
            return await _unitofwork.Questions.GetById(id);
        }

        public async Task UpdateAsync(Question entityToUpdate, Question entity)
        {
            entityToUpdate.Text = entity.Text;
            await _unitofwork.SaveAsync();
        }

        public async Task DeleteAsync(Question entity)
        {
            _unitofwork.Questions.Delete(entity);
            await _unitofwork.SaveAsync();
        }

        public bool Validation(Question entity)
        {
            var isValid = true;

            if(string.IsNullOrEmpty(entity.Text))
            {
                ErrorMessage += "Anket Sorusu Girmelisiniz\n";
                isValid=false;
            }

            return isValid;
        }
    }
}