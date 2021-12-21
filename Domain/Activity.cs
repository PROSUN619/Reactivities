using System;
using System.Collections.Generic;
//using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Activity
    {
        public Guid Id { get; set; }
        //[Required] // add this data annotation to validate data at domain entity level
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string  Category{ get; set; }
        public string  City { get; set; }
        public string Venue { get; set; }
    }
}