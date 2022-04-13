using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SalesDepartment.Data.Models;
using SalesDepartment.Data.Repositories.Abstracts;
using SalesDepartment.HttpClients;
using System;
using System.Threading.Tasks;

namespace SalesDepartment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly ISaleRepository _repository;
        private readonly IMapper _mapper;
        private readonly SaleRegisterHttpClient _client;

        public SalesController(ISaleRepository repository, IMapper mapper, SaleRegisterHttpClient client)
        {
            _repository = repository;
            _mapper = mapper;
            _client = client;
        }

        [HttpGet]
        public async Task<IActionResult> SellProducts(int id, int quantity)
        {
            var result = await _client.SaleProduct(id, quantity);
            var sale = new Sale
            {
                Successfull = result.Success,
                Message = result.Message,
                Date = DateTime.Now
            };
            _repository.CreateSale(sale);
            _repository.Save();
            return Ok(result);
        }
    }
}
