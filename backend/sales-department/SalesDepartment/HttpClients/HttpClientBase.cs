using System;
using System.Net.Http;

namespace SalesDepartment.HttpClients
{
    public class HttpClientBase
    {
        protected readonly HttpClient _httpClient;

        public HttpClientBase(HttpClient httpClient, string uri)
        {
            _httpClient = httpClient;
            _httpClient.BaseAddress = new Uri(uri);
            _httpClient.Timeout = new TimeSpan(0, 0, 30);
        }
    }
}
