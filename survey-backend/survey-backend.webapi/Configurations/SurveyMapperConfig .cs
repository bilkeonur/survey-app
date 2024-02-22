using AutoMapper;
using survey_backend.entity;
using survey_backend.webapi.DTO;

namespace survey_backend.business.Configurations
{
    public class SurveyMapperConfig: Profile
    {
        public SurveyMapperConfig()
        {
            CreateMap<Survey, SurveyDTO>()
                .ForMember(x => x.StartDate, opt => opt.MapFrom( o => o.StartDate.ToString("dd.MM.yyyy")))
                .ForMember(x => x.EndDate, opt => opt.MapFrom( o => o.EndDate.ToString("dd.MM.yyyy")));

            CreateMap<Question, QuestionsDTO>();
        }
    }
}