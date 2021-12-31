using StudioRent.DTOs;
using StudioRent.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudioRent.BLL.Interfaces
{
    public interface IUserService
    {
        public UserResponse SignUp(UserSignUpDto user);
        public bool ValidateSignUp(UserSignUpDto user);
        public UserResponse LogIn(string email);
        public bool ValidateLogIn(string email, string password);
        public void LogOut();
        public bool ValidatePwd(string userPwd, int userId);
        public User GetUserByEmail(string email);
    }
}
