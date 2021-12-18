using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using StudioRent.BLL.Interfaces;
using StudioRent.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudioRent.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IBookingService _bookingService;

        public BookingController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public IActionResult GetRoomBookings(int roomId)
        {
            return Ok(_bookingService.GetRoomBookings(roomId));
        }
        [HttpGet]
        public IActionResult GetUserBookings(int userId)
        {
            return Ok(_bookingService.GetUserBookings(userId)); 
        }
        [HttpPost]
        public IActionResult CreateBooking(Booking booking)
        {
            return Ok(_bookingService.CreateBooking(booking));
        }
        [HttpDelete]
        public IActionResult DeleteBooking(int bookingId)
        {
            return Ok(_bookingService.DeleteBooking(bookingId));
        }

    }
}
