using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using StudioRent.BLL.Interfaces;
using StudioRent.DTOs;
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

        public BookingController(IConfiguration configuration, IBookingService bookingService)
        {
            _configuration = configuration;
            _bookingService = bookingService;
        }

        [HttpGet, Route("GetRoomBookings")]
        public IActionResult GetRoomBookings(int roomId)
        {
            return Ok(_bookingService.GetRoomBookings(roomId));
        }

        [HttpGet, Route("GetUserBookings")]
        public IActionResult GetUserBookings(string email)
        {
            return Ok(_bookingService.GetUserBookings(email)); 
        }

        [HttpPost]
        public IActionResult CreateBooking(BookingDto booking)
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
