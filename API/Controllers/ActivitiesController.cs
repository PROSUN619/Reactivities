using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    [AllowAnonymous]
    public class ActivitiesController : BaseApiController
    {
        //private readonly DataContext _context;
       // private readonly IMediator _mediator;

        // public ActivitiesController(IMediator mediator )
        // {
        //     _mediator = mediator;
        // }

        [HttpGet]
        public async Task<IActionResult> GetActivities()
        {
            //return await _context.Activities.ToListAsync();
            //return await _mediator.Send(new List.Query());
            return HandleResult(await Mediator.Send(new List.Query()));

        }

        //[Authorize] // this will authorize our client with JWT Token
        //above code is not required over and over again bcz we have centralised our authorization in startup configureService
        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
            //return await Mediator.Send(new Details.Query{Id = id});                        
            //return Ok();
            //return await _context.Activities.FindAsync(id);
            //var result = await Mediator.Send(new Details.Query{Id = id});   

            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));                 
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return HandleResult( await Mediator.Send(new Create.Command{Activity = activity}));
        } 

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;

            return HandleResult(await Mediator.Send(new Edit.Command{Activity = activity}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}