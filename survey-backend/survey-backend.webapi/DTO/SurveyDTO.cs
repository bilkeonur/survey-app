namespace survey_backend.webapi.DTO
{
    public class SurveyDTO
    {
        public int Id { get; set; }
        public int OrganizationId { get; set; }
        public string OrganizationLabel { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public String StartDate { get; set; } = string.Empty;
        public String EndDate { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
    }
}