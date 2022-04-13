using Microsoft.Extensions.Configuration;
using PurchaseDepartment.Data.Models;
using PurchaseDepartment.Models.ResponseModels;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace PurchaseDepartment.HttpClients
{
    public class PurchaseRegisterHttpClient : HttpClientBase
    {
        public PurchaseRegisterHttpClient(HttpClient httpClient, IConfiguration configuration)
            : base(httpClient, configuration["PurchaseRegisterUrl"])
        {

        }

        public async Task<ApiResult> SaleProduct(int id, int quantity)
        {
            using var response = await _httpClient.GetAsync($"/materials/sell/{id}/{quantity}");

            //response.EnsureSuccessStatusCode();

            var stream = await response.Content.ReadAsStreamAsync();

            return await JsonSerializer.DeserializeAsync<ApiResult>(stream, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }

    }
}
