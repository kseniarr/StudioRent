using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudioRent.DTOs
{
    public class BookingDto
    {
        public string Email { get; set; }
        public int IdRoom { get; set; }
        public int HourFrom { get; set; }
        public int HourTo { get; set; }
        public DateTime Date { get; set; }
        public double Price { get; set; }
    }
}

