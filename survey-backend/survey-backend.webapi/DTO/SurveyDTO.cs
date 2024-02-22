namespace survey_backend.webapi.DTO
{
    public class SurveyDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public String StartDate { get; set; } = string.Empty;
        public String EndDate { get; set; } = string.Empty;
        public int ParticipationRate { get; set; } = 100;
    }
}