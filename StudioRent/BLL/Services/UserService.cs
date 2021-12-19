using StudioRent.BLL.Interfaces;
using StudioRent.Models;
using System;
using System.Collections.Generic;
using System.Linq;
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
            var test = _db.Users.Where(x => x.IdUser == userId).FirstOrDefault();
            _db.Users.Where(x => x.IdUser == userId).FirstOrDefault().Email = email;
            _db.SaveChanges();
            return _db.Users.Where(x => x.IdUser == userId).FirstOrDefault();
        }

        public List<User> CreateUser(User user)
        {
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
    }
}
