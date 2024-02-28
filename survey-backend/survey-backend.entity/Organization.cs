using System.ComponentModel.DataAnnotations;

namespace survey_backend.entity;

public class Organization
{
    public int Id { get; set; }
    
    [Required]
    [MaxLength(80)]
    public string Label { get; set; } = string.Empty;
}
