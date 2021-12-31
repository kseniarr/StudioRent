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

            var query = from bookings in _db.Bookings
                        join rooms in _db.Rooms on bookings.IdRoom equals rooms.IdRoom
                        select new
                        {
                            bookings.IdUser,
                            bookings.IdRoom,
                            rooms.Title,
                            bookings.IdBooking,
                            bookings.HourFrom,
                            bookings.HourTo,
                            bookings.Date,
                            bookings.Price
                        };
            var result = query.ToList();
            var userBookings = result.Where(x => x.IdUser == _db.Users.Where(x => x.Email == email).FirstOrDefault().IdUser).ToList().OrderByDescending(x => x.Date);
            var res = new List<UserRoomBookingDto>();
            foreach(var item in userBookings)
            {
                res.Add(new UserRoomBookingDto()
                {
                    UserId = item.IdUser,
                    RoomId = item.IdRoom,
                    Title = item.Title,
                    BookingId = item.IdBooking,
                    HourFrom = item.HourFrom,
                    HourTo = item.HourTo,
                    Date = item.Date,
                    Price = item.Price
                });
            }

            return res.OrderByDescending(x => x.Date).ToList();
        }
    }
}
