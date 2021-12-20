using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudioRent.Exceptions
{
    public class BookingNotFoundException : Exception
    {
        public int BookingId { get; private set; }
        public BookingNotFoundException(int bookingId) : base($"Booking with id {bookingId} was not found.")
        {
            BookingId = bookingId;
        }
    }
}
