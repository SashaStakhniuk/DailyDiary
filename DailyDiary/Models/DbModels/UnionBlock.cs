using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.DbModels
{
    public class UnionBlock // принципи об'єднання Union 
    {
        public UnionBlock()
        {
            this.Unions = new HashSet<Union>();
        }
        [Key]
        public int Id { get; set; }
        [MaxLength(45)]
        public string UnionBlockTitle { get; set; }
        public virtual ICollection<Union> Unions { get; set; }
    }
}
