using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.DbModels
{
    public class DayOfWeek
    {
        public DayOfWeek()
        {
            this.Shedules = new HashSet<Shedule>();
        }
        [Key]
        public int Id { get; set; }
        public string EngTitle { get; set; }
        //public string EngShortTitle { get; set; }
        //public string UaTitle { get; set; }
        //public string UaShortTitle { get; set; }
        public virtual ICollection<Shedule> Shedules { get; set; }

    }
}
