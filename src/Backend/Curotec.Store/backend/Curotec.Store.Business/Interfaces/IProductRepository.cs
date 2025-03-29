using Curotec.Store.Business.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Curotec.Store.Business.Interfaces
{
    public interface IProductRepository : IRepository<Product>
    {
        Task<IEnumerable<Product>> GetProductsByContractor(Guid contractorId);
        Task<IEnumerable<Product>> GetProductsContractors();
        Task<Product> GetProductContract(Guid id);
    }
}
