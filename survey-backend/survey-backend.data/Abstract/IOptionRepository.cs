using survey_backend.entity;

namespace survey_backend.data.Abstract
{
    public interface IOptionRepository: IRepository<Option>
    {
       Task CreateRange(List<Option> entities);
       Task<List<Option>> GetByQuestionId(int id);
    }
}