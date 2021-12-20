using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudioRent.Exceptions
{
    public class UserNotFoundException : Exception
    {
        public int UserId { get; private set; }
        public UserNotFoundException(int userId) : base ($"User with id {userId} was not found.")
        {
            UserId = userId;
        } 
    }
}
