using StudioRent.BLL.Interfaces;
using StudioRent.DTOs;
using StudioRent.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudioRent.BLL.Services
{
    public class BookingService : IBookingService
    {
        public List<Booking> CreateBooking(Booking booking)
        {
            throw new NotImplementedException();
        }

        public List<Booking> DeleteBooking(int bookingId)
        {
            throw new NotImplementedException();
        }

        public List<Booking> GetRoomBookings(int roomId)
        {
            throw new NotImplementedException();
        }

        public List<UserRoomBooking> GetUserBookings(int userId)
        {
            throw new NotImplementedException();
        }
    }
}
