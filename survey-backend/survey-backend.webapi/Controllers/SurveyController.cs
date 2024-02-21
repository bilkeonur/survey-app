using Microsoft.AspNetCore.Mvc;
using survey_backend.business.Abstract;
using survey_backend.entity;

namespace survey_backend.webapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SurveyController: ControllerBase
    {
        private readonly ILogger<SurveyController> _logger;

        private ISurveyService _surveyService;

        public SurveyController(ILogger<SurveyController> logger, ISurveyService surveyService)
        {
            _logger = logger;
            _surveyService = surveyService;
        }

        [HttpGet]
        public async Task<IActionResult> GetSurveys()
        {
            var surveys = await _surveyService.GetAll();
            return Ok(surveys);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSurvey(int id)
        {
            var survey = await _surveyService.GetById(id);
            
            if(survey == null) return NotFound();
            else return Ok(survey);
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

            var survey = await _surveyService.GetById(id);

            if(survey == null) return NotFound();
            
            await _surveyService.UpdateAsync(survey,entity);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSurvey(int id)
        {
            var survey = await _surveyService.GetById(id);

            if(survey == null) return NotFound();
            
            await _surveyService.DeleteAsync(survey);
            return NoContent();
        }
    }
}