using System;
using System.Collections.Generic;

#nullable disable

namespace StudioRent.Models
{
    public partial class Room
    {
        public Room()
        {
            Bookings = new HashSet<Booking>();
        }

        public int IdRoom { get; set; }
        public string Title { get; set; }
        public int Size { get; set; }
        public string Description { get; set; }
        public string PhotosLocation { get; set; }
        public int MorningPrice { get; set; }
        public int EveningPrice { get; set; }
        public int IndivPrice { get; set; }
        public int? Capacity { get; set; }

        public virtual ICollection<Booking> Bookings { get; set; }
    }
}
