using Test.ViewModels;

namespace Test.Services
{
    public interface IAuthService
    {
        string HashPassword(string password);
        bool VerifyPassword(string actualPassword, string hashedPassword);
        AuthViewModel GetAuthData(string id);
    }
}
