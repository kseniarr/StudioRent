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
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;

        public UserController(IConfiguration configuration, IUserService userService)
        {
            _configuration = configuration;
            _userService = userService;
        }

        [HttpPost, Route("LogIn")]
        public IActionResult LogIn(string email, string password)
        {
            if (_userService.ValidateLogIn(email, password))
                return Ok();
            else return NotFound("Email or password was incorrect");
        }

        [HttpPost, Route("SignUp")]
        public IActionResult SignUp([FromBody] User user)
        {
            if (_userService.ValidateSignUp(user))
                return Ok(_userService.CreateUser(user));
            else return NotFound("Email has alreaby been taken");
        }

        [HttpPut, Route("ChangePassword")]
        public IActionResult ChangePassword(int userId, string oldPwd, string newPwd)
        {
            if (_userService.ValidatePwd(userId, oldPwd))
                return Ok(_userService.ChangePassword(userId, oldPwd, newPwd));
            else return BadRequest("Old password was incorrect.");
        }
    }
}
