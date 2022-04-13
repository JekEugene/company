using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Warehouse.Data.Models;
using Warehouse.Data.Repositories.Abstracts;
using Warehouse.Models;
using Warehouse.Models.ResponseModels;

namespace Warehouse.Controllers
{
    [Route("/materials")]
    [ApiController]
    public class MaterialsController : ControllerBase
    {
        private readonly IMaterialRepository _repository;
        private readonly IMapper _mapper;
        
        public MaterialsController(IMaterialRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        [EnableCors]
        [HttpGet]
        public async Task<IActionResult> GetMaterials()
        {
            var products = await _repository.GetMaterialsAsync();
            return Ok(products);
        }

        [EnableCors]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMaterial(int id)
        {
            var product = await _repository.GetMaterialByIdAsync(id);
            return Ok(product);
        }

        [EnableCors]
        [HttpPost]
        public IActionResult CreateMaterial([FromBody] MaterialCreateDTO material)
        {
            if (material == null)
            {
                return BadRequest("Object is null");
            }

            var materialEntity = _mapper.Map<Material>(material);

            _repository.CreateMaterial(materialEntity);
            _repository.Save();

            var materialToReturn = _mapper.Map<MaterialCreateDTO>(materialEntity);

            return Created("/products" + materialEntity.Id, materialToReturn);
        }

        [EnableCors]
        [HttpGet("/materials/sell/{id}/{quantity}")]
        public async Task<IActionResult> UpdateMaterial([FromRoute] int id, int quantity)
        {
            var material = await _repository.GetMaterialByIdAsync(id);
            if (material == null)
            {
                return BadRequest(ApiResult.CreateFailedResult("Not found"));
            }

            if (material.Quantity < 100)
            {
                return BadRequest(ApiResult.CreateFailedResult("I tak hvataet"));
            }

            material.Quantity += quantity;
            _repository.Save();
            return Ok(ApiResult.CreateSuccessfulResult("izmeneno"));
        }
    }
}
