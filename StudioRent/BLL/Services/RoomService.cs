using StudioRent.BLL.Interfaces;
using StudioRent.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudioRent.BLL.Services
{
    public class RoomService : IRoomService
    {
        private readonly StudioRentDbContext _db;

        public RoomService(StudioRentDbContext db)
        {
            _db = db;
        }

        public Room GetRoomById(int roomId)
        {
            var test = _db.Rooms.Where(x => x.IdRoom == roomId).FirstOrDefault();
            var test2 = _db.Rooms.Where(x => x.IdRoom == roomId);
            return _db.Rooms.Where(x => x.IdRoom == roomId).FirstOrDefault();
        }

        public List<Room> GetRooms()
        {
            return _db.Rooms.ToList();
        }
    }
}
