using Curotec.Store.Business.Interfaces;
using Curotec.Store.Business.Models;
using Curotec.Store.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace Curotec.Store.Data.Repository
{
    public class ContractorRepository : Repository<Contractor>, IContractorRepository
    {
        public ContractorRepository(MyDbContext context) : base(context)
        {
        }

        public async Task<Contractor> GetContractorAddress(Guid id)
        {
            return await Db.Contrators.AsNoTracking()
                .Include(c => c.Address)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Contractor> GetContractorProductsAddress(Guid id)
        {
            return await Db.Contrators.AsNoTracking()
                .Include(c => c.Products)
                .Include(c => c.Address)
                .FirstOrDefaultAsync(c => c.Id == id);
        }
    }
}
