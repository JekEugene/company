using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Warehouse.Data.Models;
using Warehouse.Data.Repositories.Abstracts;
using Warehouse.Models;
using Warehouse.Models.ResponseModels;
using Warehouse.Services;

namespace Warehouse.Controllers
{
    [Route("products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _repository;
        private readonly IMapper _mapper;
        private readonly IProductService _service;
        public ProductsController(IProductRepository repository, IMapper mapper, IProductService service)
        {
            _repository = repository;
            _mapper = mapper;
            _service = service;
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
        [HttpPost("{productId}")]
        public IActionResult AddMaterialForProduct([FromBody] ProductMaterialDTO product)
        {
            if (product == null)
            {
                return BadRequest(ApiResult.CreateFailedResult("Not found"));
            }

            var addedProduct = _mapper.Map<ProductMaterial>(product);
            _repository.AddProductMaterial(addedProduct);
            _repository.Save();

            var productToReturn = _mapper.Map<ProductMaterialDTO>(addedProduct);

            return Created("/products" + addedProduct.MaterialId, productToReturn);
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

        [HttpPost("/produceproduct")]
        public async Task<IActionResult> ProduceProduct(int id, int quantity)
        {
            var result = await _service.ProduceProduct(id, quantity);
            return Ok(result);
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

        [EnableCors]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMaterial(int id)
        {
            var product = await _repository.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _repository.DeleteProduct(product);
            _repository.Save();

            return NoContent();
        }
    }
}
