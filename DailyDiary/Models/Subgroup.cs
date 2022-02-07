using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models
{
    public class Subgroup
    {
        //public Subgroup()
        //{
        //    Students = new HashSet<Student>();
        //}
        public int Id { get; set; }
        public string Title { get; set; }     
        public ICollection<StudentSubgroup> StudentSubgroups { get; set; }
    }
}
