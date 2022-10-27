using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyDiary.Models.ViewModels.WorkWithFiles
{
    public class FileViewModel
    {
        public string FileName { get; set; } // назва файлу
        public string FileType{ get; set; } // тип файлу
        public byte[] File { get; set; }
        //public IFormFile FormFile { get; set; } // файл
        //public List<FileList> FormFiles { get; set; } // для масиву файлів
    }
    public class FileList
    {
        public string FileName { get; set; } // назва файлу
        public string FileType { get; set; } // тип файлу
        public IFormFile FormFile { get; set; } // файл
    }
}
