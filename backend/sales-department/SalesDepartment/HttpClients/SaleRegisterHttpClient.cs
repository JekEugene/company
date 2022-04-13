using Microsoft.Extensions.Configuration;
using SalesDepartment.Data.Models;
using SalesDepartment.Models.ResponseModels;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace SalesDepartment.HttpClients
{
    public class SaleRegisterHttpClient : HttpClientBase
    {
        public SaleRegisterHttpClient(HttpClient httpClient, IConfiguration configuration)
            : base(httpClient, configuration["SaleRegisterUrl"])
        {

        }

        public async Task<ApiResult> SaleProduct(int id, int quantity)
        {
            using var response = await _httpClient.GetAsync($"/products/sell/{id}/{quantity}");

            //response.EnsureSuccessStatusCode();

            var stream = await response.Content.ReadAsStreamAsync();

            return await JsonSerializer.DeserializeAsync<ApiResult>(stream, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }
    }
}
