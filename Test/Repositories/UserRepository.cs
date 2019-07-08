using System.Linq;
using Test.Areas.Identity;
using Test.Models;

namespace Test.Repositories
{
    public class UserRepository : IUserRepository
    {
        TestContext _context;

        public UserRepository(TestContext context) { _context = context; }

        public User GetUser(string username)
        {
            return _context.Set<User>().FirstOrDefault(u => u.UserName == username);
        }
    }
}
