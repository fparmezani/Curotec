using Curotec.Store.Business.Interfaces;
using Curotec.Store.Business.Models;
using Curotec.Store.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace Curotec.Store.Data.Repository
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        public ProductRepository(MyDbContext context) : base(context) { }

        public async Task<Product> GetProductContract(Guid id)
        {
            return await Db.Products.AsNoTracking().Include(f => f.Contractor)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<Product>> GetProductsContractors()
        {
            return await Db.Products.AsNoTracking().Include(f => f.Contractor)
                .OrderBy(p => p.Name).ToListAsync();
        }

        public async Task<IEnumerable<Product>> GetProductsByContractor(Guid contractorId)
        {
            return await Get(p => p.ContractorId == contractorId);
        }
    }
}
