using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace survey_backend.data.DTO
{
    public class StaticsByDateDTO
    {
        public int SurveyId { get; set; }
        
        public string ParticipationDate { get; set; } = string.Empty;
        
        public int ParticipationCount { get; set; }
    }
}