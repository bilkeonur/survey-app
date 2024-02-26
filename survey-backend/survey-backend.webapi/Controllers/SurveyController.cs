using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using survey_backend.business.Abstract;
using survey_backend.webapi.DTO;

namespace survey_backend.webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SurveyController: ControllerBase
    {
        private readonly ILogger<SurveyController> _logger;
        private readonly IMapper _mapper;
        private IAnswerTypeService _answerTypeService;
        private IOrganizationService _organizationService;
        private ISurveyService _surveyService;
        private IQuestionService _questionService;
        private IOptionService _optionService;

        public SurveyController(
            ILogger<SurveyController> logger, 
            IMapper mapper,
            IAnswerTypeService answerTypeService,
            IOrganizationService organizationService,
            ISurveyService surveyService,
            IQuestionService questionService,
            IOptionService optionService)
        {
            _logger = logger;
            _mapper = mapper;
            _answerTypeService = answerTypeService;
            _organizationService = organizationService;
            _surveyService = surveyService;
            _questionService = questionService;
            _optionService = optionService;
        }

        [HttpGet("answertypes"), Authorize]
        public async Task<IActionResult> GetAnswerTypes()
        {
            var answerTypes = await _answerTypeService.GetAll();
            return Ok(answerTypes);
        }

        [HttpGet("organizations"), Authorize]
        public async Task<IActionResult> GetOrganizations()
        {
            var organizations = await _organizationService.GetAll();
            return Ok(organizations);
        }

        [HttpGet("surveys")]
        public async Task<IActionResult> GetSurveys()
        {
            var surveys = await _surveyService.GetAll();
            var result = _mapper.Map<List<SurveyDTO>>(surveys);
            return Ok(result);
        }

        [HttpGet("survey/{id}")]
        public async Task<IActionResult> GetSurvey(int id)
        {
            var survey = await _surveyService.GetById(id);
            
            if(survey == null) return NotFound();
            else return Ok(survey);
        }

        [HttpGet("questions/{id}")]
        public async Task<IActionResult> GetQuestions(int id)
        {
            var questions = await _questionService.GetBySurveyId(id);
            var result = _mapper.Map<List<QuestionsDTO>>(questions);
            return Ok(result);
        }
    }
}