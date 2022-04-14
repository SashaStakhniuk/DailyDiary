using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels
{
    public class SendFeedbackViewModel
    {
        public Nullable<DateTime> DataPublication { get; set; }
        public string MainInformation { get; set; }
        public int SubjectId { get; set; }
        public int TeacherId { get; set; }
        public int StudentId { get; set; }
    }
}
