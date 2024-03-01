using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace survey_backend.data.DTO
{
    public class OptionDTO
    {
        public string Name { get; set; } = string.Empty;
        public int Count { get; set; }
    }
}