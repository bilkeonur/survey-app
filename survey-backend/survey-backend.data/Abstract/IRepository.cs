namespace survey_backend.data.Abstract
{
    public interface IRepository<T>
    {
        Task<T> GetById(int id);
        Task<List<T>> GetAll();
        Task CreateAsync(T entity);
        void Update(T entity);
        void Delete(T entity);
    }
}