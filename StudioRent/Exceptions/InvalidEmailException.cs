using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudioRent.Exceptions
{
    public class InvalidEmailException : Exception
    {
        public InvalidEmailException() : base("Email must not be an empty string.")
        {

        }
    }
}
