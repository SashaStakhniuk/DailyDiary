using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels.Group
{
    public class GroupAuditoryViewModel
    {
        public int GroupId { get; set; }
        public string GroupTitle { get; set; }
        public int AuditoryId { get; set; }
        public string AuditoryTitle { get; set; }
        public string AuditoryType { get; set; }
    }
}
