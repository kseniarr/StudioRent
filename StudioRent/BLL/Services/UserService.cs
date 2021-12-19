using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using StudioRent.BLL.Interfaces;
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

        public UserService(StudioRentDbContext db)
        {
            _db = db;
        }

        public User ChangePassword(int userId, string oldPwd, string newPwd)
        {
            _db.Users.Where(x => x.IdUser == userId).FirstOrDefault().Password = HashPwd(newPwd);
            _db.SaveChanges();
            return _db.Users.Where(x => x.IdUser == userId).FirstOrDefault();
        }

        public List<User> CreateUser(User user)
        {
            user.Password = HashPwd(user.Password);
            _db.Users.Add(user);
            _db.SaveChanges();
            return _db.Users.ToList();
        }

        public bool ValidateLogIn(string email, string password)
        {
            return _db.Users.Where(x => x.Email == email).FirstOrDefault() != null // if email not found
                && _db.Users.Where(x => x.Email == email).FirstOrDefault().Password == password; // if pwd not found
        }

        public bool ValidateSignUp(User user)
        {
            return _db.Users.Where(x => x.Email == user.Email).FirstOrDefault() == null;            
        }

        public bool ValidatePwd(int userId, string pwd)
        {
            return HashPwd(pwd) == _db.Users.Where(x => x.IdUser == userId).FirstOrDefault().Password;
        }

        private string HashPwd(string pwd)
        {
            byte[] salt = new byte[128 / 8];
            using (var rngCsp = new RNGCryptoServiceProvider())
            {
                rngCsp.GetNonZeroBytes(salt);
            }
            Console.WriteLine($"Salt: {Convert.ToBase64String(salt)}");

            return Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: pwd,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 256 / 8));
        }
    }
}
