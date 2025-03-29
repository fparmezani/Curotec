using Curotec.Store.Business.Interfaces;
using Curotec.Store.Business.Models;
using Curotec.Store.Business.Models.Validations;

namespace Curotec.Store.Business.Services
{
    public class ContractorService : BaseService, IContractorService
    {
        private readonly IContractorRepository _contractorRepository;
        private readonly IAddressRepository _addressRepository;

        public ContractorService(IContractorRepository ContractorRepository,
                                 IAddressRepository AddressRepository,
                                 INotifier Notifier) : base(Notifier)
        {
            _contractorRepository = ContractorRepository;
            _addressRepository = AddressRepository;
        }

        public async Task<bool> Add(Contractor Contractor)
        {
            if (!ExecuteValidation(new ContractorValidation(), Contractor)
                || !ExecuteValidation(new AddressValidation(), Contractor.Address)) return false;

            if (_contractorRepository.Get(f => f.Document == Contractor.Document).Result.Any())
            {
                Notifier("Exist a Contractor with this document");
                return false;
            }

            await _contractorRepository.Add(Contractor);
            return true;
        }

        public async Task<bool> Update(Contractor Contractor)
        {
            if (!ExecuteValidation(new ContractorValidation(), Contractor)) return false;

            if (_contractorRepository.Get(f => f.Document == Contractor.Document && f.Id != Contractor.Id).Result.Any())
            {
                Notifier("Exist a Contractor with this document.");
                return false;
            }

            await _contractorRepository.Update(Contractor);
            return true;
        }

        public async Task UpdateAddress(Address Address)
        {
            if (!ExecuteValidation(new AddressValidation(), Address)) return;

            await _addressRepository.Update(Address);
        }

        public async Task<bool> Delete(Guid id)
        {
            if (_contractorRepository.GetContractorProductsAddress(id).Result.Products.Any())
            {
                Notifier("The Contractor has products registered!");
                return false;
            }

            var Address = await _addressRepository.GetAddressByContractor(id);

            if (Address != null)
            {
                await _addressRepository.Delete(Address.Id);
            }

            await _contractorRepository.Delete(id);
            return true;
        }

        public void Dispose()
        {
            _contractorRepository?.Dispose();
            _addressRepository?.Dispose();
        }
    }
}
