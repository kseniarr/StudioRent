using StudioRent.DTOs;
using StudioRent.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudioRent.BLL.Interfaces
{
    public interface IBookingService
    {
        public List<Booking> GetRoomBookings(int roomId);
        public List<UserRoomBookingDto> GetUserBookings(string email);
        public List<Booking> CreateBooking(BookingDto booking);
        public List<Booking> DeleteBooking(int bookingId);  
    }
}
