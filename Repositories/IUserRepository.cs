using Test.Areas.Identity.Data;

namespace Test.Repositories
{
    public interface IUserRepository
    {
        User GetUser(string username);
    }
}
