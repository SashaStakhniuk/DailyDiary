using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.DbModels
{
    public class SubgroupBlock //принципи поділу групи на підгрупи
    {
        public SubgroupBlock()
        {
            this.Subgroups = new HashSet<Subgroup>();
        }
        [Key]
        public int Id { get; set; }
        [MaxLength(45)]
        public string SubgroupBlockTitle { get; set; }
        public virtual ICollection<Subgroup> Subgroups { get; set; }
    }
}
