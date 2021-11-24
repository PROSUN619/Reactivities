using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        //private readonly DataContext _context;
       // private readonly IMediator _mediator;

        // public ActivitiesController(IMediator mediator )
        // {
        //     _mediator = mediator;
        // }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            //return await _context.Activities.ToListAsync();
            //return await _mediator.Send(new List.Query());
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
            //return Ok();
            //return await _context.Activities.FindAsync(id);
        }

        [HttpPost]
        public async Task<ActionResult> CreateActivity(Activity activity)
        {
            return Ok( await Mediator.Send(new Create.Command{Activity = activity}));
        } 

        [HttpPut("{id}")]
        public async Task<ActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Activity = activity}));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteActivity(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}