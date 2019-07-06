using Test.ViewModels;

namespace Test.Identity.Services
{
    public interface IAuthService
    {
        string HashPassword(string password);
        bool VerifyPassword(string actualPassword, string hashedPassword);
        AuthViewModel GetAuthData(string id);
    }
}
