using FluentAssertions;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Test.ViewModels;
using Xunit;

namespace TestProjectTests.Tests
{
    public class AuthControllerTest
    {
        private readonly TestsContext _testsContext;

        public AuthControllerTest()
        {
            _testsContext = new TestsContext();
        }

        [Fact]
        public async Task Login_ReturnsOkResponse()
        {
            var login = new LoginViewModel()
            {
                Username = "teste",
                Password = "1234"
            };

            var response = await _testsContext.Client.PostAsync("/api/login", DataToContent(login));
            response.EnsureSuccessStatusCode();
            response.StatusCode.Should().Be(HttpStatusCode.OK);
        }

        [Fact]
        public async Task Login_ReturnsBadRequest()
        {
            var login = new LoginViewModel()
            {
                Username = "login",
                Password = "4567"
            };

            var response = await _testsContext.Client.PostAsync("/api/login", DataToContent(login));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        }

        private ByteArrayContent DataToContent<T>(T data)
        {
            var myContent = JsonConvert.SerializeObject(data);

            var buffer = System.Text.Encoding.UTF8.GetBytes(myContent);
            var byteContent = new ByteArrayContent(buffer);

            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return byteContent;
        }
    }
}
