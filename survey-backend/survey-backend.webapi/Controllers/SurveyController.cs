using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using survey_backend.business.Abstract;
using survey_backend.entity;
using survey_backend.webapi.DTO;

namespace survey_backend.webapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SurveyController: ControllerBase
    {
        private readonly ILogger<SurveyController> _logger;
        private readonly IMapper _mapper;
        private ISurveyService _surveyService;
        private IQuestionService _questionService;
        private IOptionService _optionService;

        public SurveyController(
            ILogger<SurveyController> logger, 
            IMapper mapper, 
            ISurveyService surveyService,
            IQuestionService questionService,
            IOptionService optionService)
        {
            _logger = logger;
            _mapper = mapper;
            _surveyService = surveyService;
            _questionService = questionService;
            _optionService = optionService;
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

        [HttpPost]
        public async Task<IActionResult> CreateSurvey(Survey entity)
        {
            await _surveyService.CreateAsync(entity);
            return CreatedAtAction(nameof(GetSurvey), entity);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSurvey(int id, Survey entity)
        {
            if (id != entity.Id)
            {
                return BadRequest();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSurvey(int id)
        {
            return NoContent();
        }
    }
}