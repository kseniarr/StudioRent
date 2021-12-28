using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudioRent.DTOs
{
    public class UserRoomBookingDto
    {
        public int UserId { get; set; }
        public int RoomId { get; set; }
        public string Title { get; set; }
        public int BookingId { get; set; }
        public int HourFrom { get; set; }
        public int HourTo { get; set; }
        public DateTime Date { get; set; }
        public double Price { get; set; }
    }
}
