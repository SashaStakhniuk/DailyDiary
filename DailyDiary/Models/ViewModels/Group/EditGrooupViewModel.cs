using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels.Group
{
    public class EditGrooupViewModel
    {
        public int GroupId { get; set; }
        public string Title { get; set; }
        public List<int> CurrentStudentsId { get; set; }
        public List<int> NewStudentsId { get; set; }
    }
}
