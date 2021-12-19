using StudioRent.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudioRent.BLL.Interfaces
{
    public interface IUserService
    {
        public User ChangePassword(int userId, string oldPwd, string newPwd);
        public bool ValidateLogIn(string email, string password);
        public bool ValidateSignUp(User user);
        public bool ValidatePwd(int userId, string pwd);
        public List<User> CreateUser(User user);
    }
}
