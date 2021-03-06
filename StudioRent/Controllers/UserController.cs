using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using StudioRent.BLL.Interfaces;
using StudioRent.DTOs;
using StudioRent.Exceptions;
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
        private IHttpContextAccessor _accessor;

        public UserController(IConfiguration configuration, IUserService userService, IHttpContextAccessor accessor)
        {
            _configuration = configuration;
            _userService = userService;
            _accessor = accessor;
        }

        [HttpPost, Route("SignUp")]
        public IActionResult SignUp([FromBody] UserSignUpDto user)
        {
            try
            {
                if (_userService.ValidateSignUp(user))
                    return Ok(_userService.SignUp(user));
                else return UnprocessableEntity("Пользователь с такой почтой уже существует");
            }
            catch (InvalidEmailException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Route("LogIn")]
        public IActionResult LogIn([FromBody] LoginDto login)
        {
            try
            {
                if (_userService.ValidateLogIn(login.UserEmail, login.UserPwd))
                {
                    return Ok(_userService.LogIn(login.UserEmail));
                }
                else return UnprocessableEntity("Неверный пароль или почта");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Route("LogOut")]
        public IActionResult LogOut()
        {
            _userService.LogOut();
            return Ok("You have been successfully logged out.");
        }

        [HttpGet, Route("GetUserByEmail")]
        public IActionResult GetUserByEmail(string email)
        {
            return Ok(_userService.GetUserByEmail(email));
        }
    }
}
