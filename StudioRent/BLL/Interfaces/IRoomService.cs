using StudioRent.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudioRent.BLL.Interfaces
{
    public interface IRoomService
    {
        public List<Room> GetRooms();
        public Room GetRoomById(int roomId);
    }
}
