using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using StudioRent.BLL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudioRent.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IRoomService _roomService;

        public RoomController(IConfiguration configuration, IRoomService roomService)
        {
            _configuration = configuration;
            _roomService = roomService;
        }

        [HttpGet]
        public IActionResult GetRooms()
        {
            return Ok(_roomService.GetRooms());
        }

        [HttpGet, Route("GetRoomById")]
        public IActionResult GetRoomById(int roomId)
        {
            return Ok(_roomService.GetRoomById(roomId));
        }
    }
}
