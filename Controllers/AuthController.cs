using Microsoft.AspNetCore.Mvc;
using Test.Repositories;
using Test.Services;
using Test.ViewModels;

namespace Test.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        IAuthService authService;
        IUserRepository userRepository;

        public AuthController(IAuthService authService, IUserRepository userRepository)
        {
            this.authService = authService;
            this.userRepository = userRepository;
        }

        [HttpPost("login")]
        public ActionResult<AuthViewModel> Post([FromBody]LoginViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = userRepository.GetUser(model.Username);

            if (user == null)
            {
                return BadRequest(new { message = "Login e/ou senha inválido(s)" });
            }

            var passwordValid = authService.VerifyPassword(model.Password, user.PasswordHash);
            if (!passwordValid)
            {
                return BadRequest(new { message = "Login e/ou senha inválido(s)" });
            }

            return authService.GetAuthData(user.Id);
        }
    }
}
