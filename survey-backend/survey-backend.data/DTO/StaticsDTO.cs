using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace survey_backend.data.DTO
{
    public class StaticsDTO
    {
        public int SurveyId { get; set; }
        public int QuestionId { get; set; }
        public int TotalResponses { get; set; }
    }
}