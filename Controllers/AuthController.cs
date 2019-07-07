using CryptoHelper;
using Microsoft.AspNetCore.Mvc;
using Test.Services;
using Test.ViewModels;

namespace Test.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        IAuthService authService;

        public AuthController(IAuthService authService)
        {
            this.authService = authService;
        }

        [HttpPost("login")]
        public ActionResult<AuthViewModel> Post([FromBody]LoginViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var passwordValid = authService.VerifyPassword(model.Password, Crypto.HashPassword("1234"));
            if (!passwordValid)
            {
                return BadRequest(new { message = "Login e/ou senha inválido(s)" });
            }

            return authService.GetAuthData("1234");
        }
    }
}
