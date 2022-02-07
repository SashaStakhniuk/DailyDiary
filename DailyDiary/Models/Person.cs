using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class Person
    {
        //public int PersonId { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public Nullable<DateTime> Birthday { get; set; }
        public int Age { get; set; }
        
    }
}
