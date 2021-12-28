using StudioRent.BLL.Interfaces;
using StudioRent.DTOs;
using StudioRent.Exceptions;
using StudioRent.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
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

        public List<Booking> CreateBooking(BookingDto booking)
        {
            var idUser = _db.Users.Where(x => x.Email == booking.Email).FirstOrDefault().IdUser;
            createBooking(booking, idUser);
            return GetRoomBookings(booking.IdRoom);
        }
        private void createBooking(BookingDto booking, int idUser)
        {
            _db.Bookings.Add(new Booking()
            {
                IdUser = idUser,
                IdRoom = booking.IdRoom,
                HourFrom = booking.HourFrom,
                HourTo = booking.HourTo,
                Date = booking.Date,
                NumPeople = booking.NumPeople,
                Price = booking.Price
            });
            _db.SaveChanges();
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
            var today = DateTime.Today;
            var temp = (int)CultureInfo.GetCultureInfo("ru-RU").DateTimeFormat.FirstDayOfWeek;
            var temp2 = (int)DateTime.Today.DayOfWeek;
            DateTime startOfWeek = DateTime.Today.AddDays(
                (int)CultureInfo.GetCultureInfo("ru-RU").DateTimeFormat.FirstDayOfWeek -
                (int)DateTime.Today.DayOfWeek);

            var dates = new List<DateTime>();
            for(int i = 0; i < 7; i++)
            {
                dates.Add(startOfWeek.AddDays(i));
            }

            return _db.Bookings.Where(x => x.IdRoom == roomId && dates.Contains(x.Date)).ToList();
        }

        public List<UserRoomBookingDto> GetUserBookings(string email)
        {
            if (_db.Users.Where(x => x.Email == email).FirstOrDefault() == null) throw new UserNotFoundException(email);

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
                        Date = p.Date,
                        Price = p.Price
                    }
                ).ToList();
        }
    }
}
