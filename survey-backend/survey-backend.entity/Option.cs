using System.ComponentModel.DataAnnotations;

namespace survey_backend.entity
{
    public class Option
    {
        public int Id { get; set; }
    
        [Required]
        public int QuestionId { get; set; }
        public virtual Question Question { get; set; }

        [Required]
        [MaxLength(80)]
        public string Text { get; set; } = string.Empty;
    }
}