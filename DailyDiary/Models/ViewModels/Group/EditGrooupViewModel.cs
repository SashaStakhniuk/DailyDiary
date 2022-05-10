using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels.Group
{
    public class EditGrooupViewModel
    {
        public int GroupId { get; set; }
        public int Semester { get; set; }
        public string Title { get; set; }
        public List<int> SubjsId { get; set; }
        public List<int> Hours { get; set; }
    }
}
