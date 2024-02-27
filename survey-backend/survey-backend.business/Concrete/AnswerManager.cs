using survey_backend.business.Abstract;
using survey_backend.data.Abstract;
using survey_backend.entity;

namespace survey_backend.business.Concrete
{
    public class AnswerManager: IAnswerService

    {
        private readonly IUnitOfWork _unitofwork;
        public AnswerManager(IUnitOfWork unitofwork)
        {
            _unitofwork = unitofwork;
        }

        public string ErrorMessage { get; set; }

        public async Task<Answer> CreateAsync(Answer entity)
        {
            await _unitofwork.Answers.CreateAsync(entity);
            await _unitofwork.SaveAsync();
            return entity;
        }

        public async Task<List<Answer>> CreateRange(List<Answer> entities)
        {
            await _unitofwork.Answers.CreateRange(entities);
            await _unitofwork.SaveAsync();
            return entities;
        }

        public async Task<List<Answer>> GetAll()
        {
            return await _unitofwork.Answers.GetAll();
        }

        public async Task<Answer> GetById(int id)
        {
            return await _unitofwork.Answers.GetById(id);
        }

        public async Task UpdateAsync(Answer entityToUpdate, Answer entity)
        {
            entityToUpdate.Id = entity.Id;
            await _unitofwork.SaveAsync();
        }

        public async Task DeleteAsync(Answer entity)
        {
            _unitofwork.Answers.Delete(entity);
            await _unitofwork.SaveAsync();
        }

        public async Task<object> CalculateStatics()
        {
            return await _unitofwork.Answers.CalculateStatics();
        }

        public bool Validation(Answer entity)
        {
            return true;
        }
    }
}