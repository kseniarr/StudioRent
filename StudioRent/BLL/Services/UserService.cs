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

        public User ChangeEmail(int userId, string email)
        {
            
            _db.Users.Where(x => x.IdUser == userId).FirstOrDefault().Email = email;
            _db.SaveChanges();
            return _db.Users.Where(x => x.IdUser == userId).FirstOrDefault();
        }

        public List<User> CreateUser(User user)
        {
            byte[] salt = new byte[128 / 8];
            using (var rngCsp = new RNGCryptoServiceProvider())
            {
                rngCsp.GetNonZeroBytes(salt);
            }
            Console.WriteLine($"Salt: {Convert.ToBase64String(salt)}");

            user.Password = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: user.Password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 256 / 8));

            _db.Users.Add(user);
            _db.SaveChanges();
            return _db.Users.ToList();
        }

        public List<User> DeleteUser(int userId)
        {
            _db.Users.Remove(_db.Users.Where(x => x.IdUser == userId).FirstOrDefault());
            _db.SaveChanges();
            return _db.Users.ToList();
        }

        public List<User> GetAllUsers()
        {
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
    }
}
