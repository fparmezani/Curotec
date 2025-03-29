using AutoMapper;
using Curotec.Store.API.Controllers;
using Curotec.Store.API.Extensions;
using Curotec.Store.API.ViewModel;
using Curotec.Store.Business.Interfaces;
using Curotec.Store.Business.Models;
using Curotec.Store.Business.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Curotec.Store.API.V1.Controllers
{
    [Authorize]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/contractor")]
    public class ContratorController : MainController
    {
        private readonly IContractorRepository _contractorRepository;
        private readonly IContractorService _contractorService;
        private readonly IAddressRepository _addressRepository;
        private readonly IMapper _mapper;

        public ContratorController(IContractorRepository contractorRepository,
                                      IMapper mapper,
                                      ContractorService contractorService,
                                      INotifier notifier,
                                      IAddressRepository addressRepository,
                                      IUser user) : base(notifier, user)
        {
            _contractorRepository = contractorRepository;
            _mapper = mapper;
            _contractorService = contractorService;
            _addressRepository = addressRepository;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IEnumerable<ContractorViewModel>> GetAll()
        {
            return _mapper.Map<IEnumerable<ContractorViewModel>>(await _contractorRepository.GetAll());
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<ContractorViewModel>> GetById(Guid id)
        {
            var contractor = await GetContractorProductsAddress(id);

            if (contractor == null) return NotFound();

            return contractor;
        }

        [ClaimsAuthorize("Contractor", "Add")]
        [HttpPost]
        public async Task<ActionResult<ContractorViewModel>> Adicionar(ContractorViewModel contractorViewModel)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            await _contractorService.Add(_mapper.Map<Contractor>(contractorViewModel));

            return CustomResponse(contractorViewModel);
        }

        [ClaimsAuthorize("Contractor", "Update")]
        [HttpPut("{id:guid}")]
        public async Task<ActionResult<ContractorViewModel>> Atualizar(Guid id, [FromBody] ContractorViewModel contractorViewModel)
        {
            if (id != contractorViewModel.Id)
            {
                NotifyError("The provided ID does not match the query ID");
                return CustomResponse(contractorViewModel);
            }

            if (!ModelState.IsValid) return CustomResponse(ModelState);

            await _contractorService.Update(_mapper.Map<Contractor>(contractorViewModel));

            return CustomResponse(contractorViewModel);
        }

        [ClaimsAuthorize("Contractor", "Delete")]
        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<ContractorViewModel>> Excluir(Guid id)
        {
            var contractorViewModel = await GetContractorAddress(id);

            if (contractorViewModel == null) return NotFound();

            await _contractorService.Delete(id);

            return CustomResponse(contractorViewModel);
        }

        [HttpGet("address/{id:guid}")]
        public async Task<AddressViewModel> ObterEnderecoPorId(Guid id)
        {
            return _mapper.Map<AddressViewModel>(await _addressRepository.GetById(id));
        }

        [ClaimsAuthorize("Contractor", "Update")]
        [HttpPut("address/{id:guid}")]
        public async Task<IActionResult> AtualizarEndereco(Guid id, AddressViewModel AddressViewModel)
        {
            if (id != AddressViewModel.Id)
            {
                NotifyError("The provided ID does not match the query ID");
                return CustomResponse(AddressViewModel);
            }

            if (!ModelState.IsValid) return CustomResponse(ModelState);

            await _contractorService.UpdateAddress(_mapper.Map<Address>(AddressViewModel));

            return CustomResponse(AddressViewModel);
        }

        private async Task<ContractorViewModel> GetContractorProductsAddress(Guid id)
        {
            return _mapper.Map<ContractorViewModel>(await _contractorRepository.GetContractorProductsAddress(id));
        }

        private async Task<ContractorViewModel> GetContractorAddress(Guid id)
        {
            return _mapper.Map<ContractorViewModel>(await _contractorRepository.GetContractorAddress(id));
        }
    }
}
