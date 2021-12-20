﻿using StudioRent.DTOs;
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
        public List<UserRoomBookingDto> GetUserBookings(int userId);
        public List<Booking> CreateBooking(Booking booking);
        public List<Booking> DeleteBooking(int bookingId);  
    }
}
