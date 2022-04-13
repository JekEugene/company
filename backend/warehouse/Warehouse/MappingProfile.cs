using AutoMapper;
using Warehouse.Data.Models;
using Warehouse.Models;

namespace Warehouse
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<MaterialCreateDTO, Material>().ReverseMap();
            CreateMap<ProductCreateDTO, Product>().ReverseMap();
        }
    }
}
