using StudioRent.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudioRent.BLL.Interfaces
{
    public interface IUserService
    {
        public List<User> CreateUser(User user);
        public List<User> DeleteUser(int userId);
        public User ChangeEmail(int userId, string email);
        public List<User> GetAllUsers();
    }
}
