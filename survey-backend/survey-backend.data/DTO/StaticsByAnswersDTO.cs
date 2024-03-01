using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace survey_backend.data.DTO
{
    public class StaticsByAnswersDTO
    {
        public int QuestionId { get; set; }
        
        public string QuestionText { get; set; } = string.Empty;
        
        public List<OptionDTO> Options { get; set; } = new List<OptionDTO>();
    }
}