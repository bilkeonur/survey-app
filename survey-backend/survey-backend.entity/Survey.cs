using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace survey_backend.entity
{
    public class Survey
    {
        public int Id { get; set; }

        public int OrganizationId { get; set; }
        
        public Organization? Organization { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = string.Empty;
    
        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        public bool IsActive { get; set; } = true;
    }
}