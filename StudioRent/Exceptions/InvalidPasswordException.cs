using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudioRent.Exceptions
{
    public class InvalidPasswordException : Exception
    {
        public InvalidPasswordException() : base("The password must not be empty.")
        {

        }
    }
}
