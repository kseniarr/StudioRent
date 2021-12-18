﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudioRent.DTOs
{
    public class UserRoomBooking
    {
        public int UserId { get; set; }
        public int RoomId { get; set; }
        public int Title { get; set; }
        public int BookingId { get; set; }
        public int HourFrom { get; set; }
        public int HourTo { get; set; }
        public DateTime Date { get; set; }
    }
}