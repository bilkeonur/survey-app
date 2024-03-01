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

        [Required]
        public bool IsMandatory { get; set; }

        [Required]
        public int InputFormatId { get; set; }
        public string InputFormatRule { get; set; } = string.Empty;

        public virtual List<Option> Options { get; set; }
    }

    public enum EnumAnswerType
    {
        CoktanTekliSecmeli = 1,
        CoktanCokluSecmeli = 2,
        YazarakYanitVerilen = 3,
        ListedenTekSecilen = 4
    }

    public enum EnumInputFormats
    {
        Numeric = 2,
        Alfanumeric = 3,
        Date = 4
    }

    public enum EnumDateFormats
    {
        GGAAYYYY = 1,
        AAGGYYYY = 2,
        YYYYAAGG = 3,
        YYYYGGAA = 4
    }
}