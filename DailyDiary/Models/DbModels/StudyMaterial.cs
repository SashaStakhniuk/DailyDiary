using DailyDiary.Models.IntermediateModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.DbModels
{
    public class StudyMaterial
    {
        public StudyMaterial()
        {
            this.LessonStudyMaterials = new HashSet<LessonStudyMaterial>();
        }
        [Key]
        public int Id { get; set; }
        [MaxLength(45)]
        public string Title { get; set; }
        public byte[] Material { get; set; }
        [MaxLength(45)]
        public string OtherInfo { get; set; }
        public string Base64URL { get; set; }//фото

        public virtual ICollection<LessonStudyMaterial> LessonStudyMaterials { get; set; }
    }
}
