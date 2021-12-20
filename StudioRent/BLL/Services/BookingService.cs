using StudioRent.BLL.Interfaces;
using StudioRent.DTOs;
using StudioRent.Exceptions;
using StudioRent.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudioRent.BLL.Services
{
    public class BookingService : IBookingService
    {
        private readonly StudioRentDbContext _db;

        public BookingService(StudioRentDbContext db)
        {
            _db = db;
        }

        public List<Booking> CreateBooking(Booking booking)
        {
            _db.Bookings.Add(booking);
            _db.SaveChanges();
            return _db.Bookings.ToList();
        }

        public List<Booking> DeleteBooking(int bookingId)
        {
            if (_db.Bookings.Find(bookingId) == null) throw new BookingNotFoundException(bookingId);

            _db.Bookings.Remove(_db.Bookings.Find(bookingId));
            _db.SaveChanges();
            return _db.Bookings.ToList();
        }

        public List<Booking> GetRoomBookings(int roomId)
        {
            if (_db.Rooms.Find(roomId) == null) throw new RoomNotFoundException(roomId);
            return _db.Bookings.Where(x => x.IdRoom == roomId).ToList();
        }

        public List<UserRoomBookingDto> GetUserBookings(int userId)
        {
            if (_db.Users.Find(userId) == null) throw new UserNotFoundException(userId);

            return _db.Bookings.Join(_db.Rooms, 
                p => p.IdRoom, 
                c => c.IdRoom, 
                (p, c) =>  
                    new UserRoomBookingDto()
                    {
                        UserId = p.IdUser,
                        RoomId = p.IdRoom,
                        Title = c.Title,
                        BookingId = p.IdBooking,
                        HourFrom = p.HourFrom,
                        HourTo = p.HourTo,
                        Date = p.Date
                    }
                ).ToList();
        }
    }
}
