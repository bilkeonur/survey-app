using System.ComponentModel.DataAnnotations;

namespace survey_backend.entity
{
    public class Question
    {
        public Question()
        {
            Options = new List<Option>();
        }

        public int Id { get; set; }

        [Required]
        public int SurveyId { get; set; }
        public Survey? Survey { get; set; }
        
        [Required]
        [MaxLength(150)]
        public string Text { get; set; } = string.Empty;

        [Required]
        public int AnswerTypeId { get; set; }
        public AnswerType? AnswerType { get; set; }

        [Required]
        public bool IsMandatory { get; set; }

        [Required]
        public int InputFormatId { get; set; }
        public string InputFormatRule { get; set; } = string.Empty;

        public virtual List<Option> Options { get; set; }
    }
}