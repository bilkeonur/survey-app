using System.ComponentModel.DataAnnotations;

namespace survey_backend.entity
{
    public class AnswerType
    {
        public int Id { get; set; }
    
        [Required]
        [MaxLength(80)]
        public string Name { get; set; } = string.Empty;
    }
}