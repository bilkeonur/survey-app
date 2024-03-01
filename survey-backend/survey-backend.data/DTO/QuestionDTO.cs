using survey_backend.entity;

namespace survey_backend.webapi.DTO
{
    public class QuestionsDTO
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public  int AnswerTypeId { get; set; }
        public bool IsMandatory { get; set; }
        public int InputFormatId { get; set; }
        public string InputFormatRule { get; set; } = string.Empty;
        public List<Option> Options { get; set; } = new List<Option>();
    }
}