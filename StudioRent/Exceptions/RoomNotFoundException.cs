using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudioRent.Exceptions
{
    public class RoomNotFoundException : Exception
    {
        public int RoomId { get; private set; }
        public RoomNotFoundException(int roomId) : base($"Room with id {roomId} was not found.")
        {
            RoomId = roomId;
        }
    }
}
