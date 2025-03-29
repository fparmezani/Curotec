using Curotec.Store.Business.Models;

namespace Curotec.Store.Business.Interfaces
{
    public interface IAddressRepository : IRepository<Address>
    {
        Task<Address> GetAddressByContractor(Guid contractorId);
    }
}
