using System;
using System.Collections.Generic;

#nullable disable

namespace StudioRent.Models
{
    public partial class Booking
    {
        public int IdBooking { get; set; }
        public int IdUser { get; set; }
        public int IdRoom { get; set; }
        public int HourFrom { get; set; }
        public int HourTo { get; set; }
        public DateTime Date { get; set; }
        public double Price { get; set; }

        public virtual Room IdRoomNavigation { get; set; }
        public virtual User IdUserNavigation { get; set; }
    }
}
