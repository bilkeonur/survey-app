using System.ComponentModel.DataAnnotations;

namespace survey_backend.entity
{
    public class Question
    {
        public int Id { get; set; }

        public int SurveyId { get; set; }
        public Survey? Survey { get; set; }
        
        [Required]
        [MaxLength(150)]
        public string Text { get; set; } = string.Empty;

        public int AnswerTypeId { get; set; }
        public AnswerType? AnswerType { get; set; }

        public bool IsMandatory { get; set; }
    }
}