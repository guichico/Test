using Microsoft.AspNetCore.Identity;

namespace Test.Areas.Identity
{
    // Add profile data for application users by adding properties to the User class
    public class User : IdentityUser
    {
        public string Name { get; set; }
    }
}
