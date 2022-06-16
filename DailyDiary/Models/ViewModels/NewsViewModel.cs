using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels
{
    public class NewsViewModel
    {
        public int TeacherId { get; set; }
        public string Title { get; set; }
        public string MainInfo { get; set; }
        public string Sender { get; set; }
        public string Base64Url { get; set; }
        public Nullable<DateTime> DataPublication { get; set; }
    }
}
