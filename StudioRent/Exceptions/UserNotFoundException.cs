using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudioRent.Exceptions
{
    public class UserNotFoundException : Exception
    {
        public string UserEmail { get; private set; }
        public UserNotFoundException(string userEmail) : base ($"User with email {userEmail} was not found.")
        {
            UserEmail = userEmail;
        } 
    }
}
