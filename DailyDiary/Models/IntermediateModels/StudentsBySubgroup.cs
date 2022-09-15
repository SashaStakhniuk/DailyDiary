using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.DbModels
{
    public class StudentsBySubgroup
    {
        //[Key]
        //public int Id { get; set; }
        public int StudentId { get; set; }
        public int SubgroupId { get; set; }
        public virtual Student Student { get; set; }
        public virtual Subgroup Subgroup { get; set; }
    }
}
