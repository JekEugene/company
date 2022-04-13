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
    [Route("products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _repository;
        private readonly IMapper _mapper;

        public ProductsController(IProductRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [EnableCors]
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _repository.GetProductsAsync();
            return Ok(products);
        }

        [EnableCors]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _repository.GetProductByIdAsync(id);
            return Ok(product);
        }

        [EnableCors]
        [HttpPost]
        public IActionResult CreateProduct([FromBody] ProductCreateDTO product)
        {
            if (product == null)
            {
                return BadRequest("Object is null");
            }

            var productEntity = _mapper.Map<Product>(product);

            _repository.CreateProduct(productEntity);
            _repository.Save();

            var productToReturn = _mapper.Map<ProductCreateDTO>(productEntity);

            return Created("/products" + productEntity.Id, productToReturn);
        }

        /*[HttpPost("/{id}/material/add")]
        public IActionResult CreateMaterialForProduct(int id, [FromBody] int materialId, int quantity)
        {

        }*/
        [EnableCors]
        [HttpGet("/products/sell/{id}/{quantity}")]
        public async Task<IActionResult> UpdateProduct([FromRoute]int id, int quantity)
        {
            var product = await _repository.GetProductByIdAsync(id);
            if(product == null)
            {
                return BadRequest(ApiResult.CreateFailedResult("Not found"));
            }

            if (product.Quantity < quantity)
            {
                return BadRequest(ApiResult.CreateFailedResult("Malo"));
            }

            product.Quantity -= quantity;
            _repository.Save();
            return Ok(ApiResult.CreateSuccessfulResult("izmeneno"));
        }
    }
}
