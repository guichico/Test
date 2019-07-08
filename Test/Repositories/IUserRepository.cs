using Test.Areas.Identity;

namespace Test.Repositories
{
    public interface IUserRepository
    {
        User GetUser(string username);
    }
}
