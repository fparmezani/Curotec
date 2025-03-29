using Curotec.Store.Business.Interfaces;
using Curotec.Store.Business.Models;
using Curotec.Store.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace Curotec.Store.Data.Repository
{
    public class AddressRepository: Repository<Address>, IAddressRepository
    {
        public AddressRepository(MyDbContext context) : base(context) { }

    public async Task<Address> GetAddressByContractor(Guid contractorId)
    {
        return await Db.Addresses.AsNoTracking()
            .FirstOrDefaultAsync(f => f.ContractorId == contractorId);
    }
}
}
