using Curotec.Store.Business.Models;

namespace Curotec.Store.Business.Interfaces
{
    public interface IContractorRepository : IRepository<Contractor>
    {
        Task<Contractor> GetContractorAddress(Guid id);
        Task<Contractor> GetContractorProductsAddress(Guid id);
    }
}
