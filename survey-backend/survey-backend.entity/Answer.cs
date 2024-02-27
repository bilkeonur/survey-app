using System.ComponentModel.DataAnnotations;

namespace survey_backend.entity
{
    public class Answer
    {
        public int Id { get; set; }    
        
        public int SurveyId { get; set; }
        public Survey? Survey { get; set; }
        
        public int QuestionId { get; set; }
        public Question? Question { get; set; }
        
        public string SelOptions { get; set; } = string.Empty;
    }
}