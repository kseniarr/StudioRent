using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Http;
using StudioRent.BLL.Interfaces;
using StudioRent.DTOs;
using StudioRent.Exceptions;
using StudioRent.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace StudioRent.BLL.Services
{
    public class UserService : IUserService
    {
        private readonly StudioRentDbContext _db;
        private IHttpContextAccessor _accessor;

        public UserService(StudioRentDbContext db, IHttpContextAccessor accessor)
        {
            _db = db;
            _accessor = accessor;
        }


        public UserResponse SignUp(UserSignUpDto user)
        {
            HashPwd(user.Password, out byte[] pwdKey, out byte[] pwdHash);

            _db.Users.Add(new User() { 
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Password = pwdHash,
                PasswordKey = pwdKey
            });
            var response = new UserResponse()
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email
            };
            _db.SaveChanges();

            return response;
        }
        public bool ValidateSignUp(UserSignUpDto user)
        {
            if (string.IsNullOrEmpty(user.Email)) throw new InvalidEmailException();
            return GetUserByEmail(user.Email) == null && !string.IsNullOrEmpty(user.Email); 
        }

        public UserResponse LogIn(string email)
        {
            _accessor.HttpContext.Session.SetString("userId", GetUserByEmail(email).IdUser.ToString());
            var response = new UserResponse()
            {
                FirstName = GetUserByEmail(email).FirstName,
                LastName = GetUserByEmail(email).LastName,
                Email = email
            };
            return response;
        }
        public bool ValidateLogIn(string email, string password)
        {
            if (string.IsNullOrEmpty(email)) throw new InvalidEmailException();
            return GetUserByEmail(email) != null // if email was found 
                && ValidatePwd(password, GetUserByEmail(email).IdUser); // if pwd correct
        }
        public void LogOut()
        {
            _accessor.HttpContext.Session.Remove("userId");
        }

        public bool ValidatePwd(string userPwd, int userId)
        {
            if (_db.Users.Find(userId) == null) throw new UserNotFoundException(_db.Users.Find(userId).Email);
            if (string.IsNullOrEmpty(userPwd)) throw new InvalidPasswordException();

            byte[] dbPwd = _db.Users.Find(userId).Password, dbKey = _db.Users.Find(userId).PasswordKey,
                userPwdHash = HashPwd(userPwd, dbKey);

            for(int i = 0; i < dbPwd.Length; i++)
            {
                if (dbPwd[i] != userPwdHash[i]) return false;
            }
            return true;
        }
        private byte[] HashPwd(string pwd, out byte[] pwdKey, out byte[] pwdHash)
        {
            using (var hmac = new HMACSHA512())
            {
                pwdKey = hmac.Key;
                pwdHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(pwd));
            }
            return pwdHash;
        }
        private byte[] HashPwd(string pwd, byte[] pwdKey)
        {
            byte[] pwdHash;
            using (var hmac = new HMACSHA512(pwdKey))
            {
                pwdHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(pwd));
            }
            return pwdHash;
        }
        public User GetUserByEmail(string email)
        {
            return _db.Users.Where(x => x.Email == email).FirstOrDefault();
        }
    }
}
