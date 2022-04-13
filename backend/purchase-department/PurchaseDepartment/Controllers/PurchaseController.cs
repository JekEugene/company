using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PurchaseDepartment.Data.Models;
using PurchaseDepartment.Data.Repositories.Abstracts;
using PurchaseDepartment.HttpClients;
using System;
using System.Threading.Tasks;

namespace PurchaseDepartment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseController : ControllerBase
    {
        private readonly IPurchaseRepository _repository;
        private readonly IMapper _mapper;
        private readonly PurchaseRegisterHttpClient _client;

        public PurchaseController(IPurchaseRepository repository, IMapper mapper, PurchaseRegisterHttpClient client)
        {
            _repository = repository;
            _mapper = mapper;
            _client = client;
        }

        [HttpGet]
        public async Task<IActionResult> AddPurchase(int id, int quantity)
        {
            var result = await _client.SaleProduct(id, quantity);
            var purchase = new Purchase
            {
                Successfull = result.Success,
                Message = result.Message,
                Date = DateTime.Now
            };
            _repository.CreatePurchase(purchase);
            _repository.Save();
            return Ok(result);
        }
    }
}
