using survey_backend.entity;

namespace survey_backend.data.Abstract
{
    public interface IOptionRepository: IRepository<Option>
    {
       Task<List<Option>> GetByQuestionId(int id);
    }
}