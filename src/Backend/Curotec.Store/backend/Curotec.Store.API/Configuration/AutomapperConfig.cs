using AutoMapper;
using Curotec.Store.API.ViewModel;
using Curotec.Store.Business.Models;

namespace Curotec.Store.API.Configuration
{
    public class AutomapperConfig : Profile
    {
        public AutomapperConfig()
        {
            CreateMap<Contractor, ContractorViewModel>().ReverseMap();
            CreateMap<Address, AddressViewModel>().ReverseMap();
            CreateMap<ProductViewModel, Product>();

            CreateMap<Product, ProductViewModel>()
                .ForMember(dest => dest.NameContractor, opt => opt.MapFrom(src => src.Contractor.Name));
        }
    }
}
