using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using System.Net.Http;
using Test;

namespace TestProjectTests.Tests
{
    internal class TestsContext
    {
        public HttpClient Client { get; set; }
        private TestServer _server;

        public TestsContext()
        {
            SetupClient();
        }
        private void SetupClient()
        {
            _server = new TestServer(new WebHostBuilder().UseStartup<Startup>());
            Client = _server.CreateClient();
        }
    }
}