using Curotec.Store.Business.Models;

namespace Curotec.Store.Business.Interfaces
{
    public interface IContractorService
    {
        Task<bool> Add(Contractor contractor);
        Task<bool> Update(Contractor contractor);
        Task<bool> Delete(Guid id);

        Task UpdateAddress(Address address);
    }
}
