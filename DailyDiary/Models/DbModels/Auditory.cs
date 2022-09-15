using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.DbModels
{
    public class Auditory
    {
        public Auditory()
        {
            this.Shedules = new HashSet<Shedule>();
        }
        [Key]
        public int Id { get; set; }
        [MaxLength(45)]
        public string Title { get; set; }
        public int PlacesAmount { get; set; }
        [ForeignKey("AuditoryType")]
        public int AuditoryTypeId { get; set; }
        public virtual AuditoryType AuditoryType { get;set;}
        public virtual ICollection<Shedule> Shedules { get; set; }
    }
}
