using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using survey_backend.business.Abstract;
using survey_backend.entity;
using survey_backend.webapi.DTO;

namespace survey_backend.webapi.Controllers
{
    [ApiController]
    [Route("")]
    public class SurveyController: ControllerBase
    {
        private readonly ILogger<SurveyController> _logger;
        private readonly IMapper _mapper;
        private IAnswerService _answerService;
        private IOrganizationService _organizationService;
        private ISurveyService _surveyService;
        private IQuestionService _questionService;
        private IOptionService _optionService;

        public SurveyController(
            ILogger<SurveyController> logger, 
            IMapper mapper,
            IAnswerService answerService,
            IOrganizationService organizationService,
            ISurveyService surveyService,
            IQuestionService questionService,
            IOptionService optionService)
        {
            _logger = logger;
            _mapper = mapper;
            _answerService = answerService;
            _organizationService = organizationService;
            _surveyService = surveyService;
            _questionService = questionService;
            _optionService = optionService;
        }

        [HttpGet("answers/get"), Authorize]
        public async Task<IActionResult> GetAnswers()
        {
            var answers = await _answerService.GetAll();
            return Ok(answers);
        }

        [HttpGet("answers/get{id}"), Authorize]
        public async Task<IActionResult> GetAnswer(int id)
        {
            var answer = await _answerService.GetById(id);
            
            if(answer == null) return NotFound();
            else return Ok(answer);
        }

        [HttpPost("answers/create")]
        public async Task<IActionResult> CreateAnswer(List<Answer> entities)
        {
            await _answerService.CreateRange(entities);
            return Ok();
        }

        [HttpGet("statics/getbydaterange/{id}"), Authorize]
        public async Task<IActionResult> GetStatisticsByDateRange(int id)
        {
            var statics = await _answerService.GetStatisticsByDateRange(id);
            return Ok(statics);
        }

        [HttpGet("statics/getbyanswers/{id}")]
        public async Task<IActionResult> GetStatisticsByAnswers(int id)
        {
            var statics = await _answerService.GetStatisticsByAnswers(id);
            return Ok(statics);
        }

        [HttpGet("organizations/get"), Authorize]
        public async Task<IActionResult> GetOrganizations()
        {
            var organizations = await _organizationService.GetAll();
            return Ok(organizations);
        }

        [HttpGet("organizations/get{id}"), Authorize]
        public async Task<IActionResult> GetOrganization(int id)
        {
            var organization = await _organizationService.GetById(id);
            
            if(organization == null) return NotFound();
            else return Ok(organization);
        }

        [HttpPost("organizations/create"), Authorize]
        public async Task<IActionResult> CreateOrganization(Organization entity)
        {
            await _organizationService.CreateAsync(entity);
            return CreatedAtAction(nameof(GetOrganization), new {id=entity.Id},entity);
        }

        [HttpPut("organizations/update/{id}"), Authorize]
        public async Task<IActionResult> UpdateOrganization(int id, Organization entity)
        {
            if (id != entity.Id) { return BadRequest();}

            var organization = await _organizationService.GetById(id);

            if(organization == null) { return NotFound(); }

            await _organizationService.UpdateAsync(organization,entity);

            return NoContent();
        }

        [HttpDelete("organizations/delete/{id}"), Authorize]
        public async Task<IActionResult> DeleteOrganization(int id)
        {
            var organization = await _organizationService.GetById(id);

            if(organization == null){ return NotFound();}
            await _organizationService.DeleteAsync(organization);
            return NoContent();
        }

        [HttpGet("surveys/get")]
        public async Task<IActionResult> GetSurveys()
        {
            var surveys = await _surveyService.GetAll();
            var result = _mapper.Map<List<SurveyDTO>>(surveys);
            return Ok(result);
        }

        [HttpGet("surveys/get{id}")]
        public async Task<IActionResult> GetSurvey(int id)
        {
            var survey = await _surveyService.GetById(id);
            
            if(survey == null) return NotFound();
            else return Ok(survey);
        }

        [HttpPost("surveys/create"), Authorize]
        public async Task<IActionResult> CreateSurvey(Survey entity)
        {
            await _surveyService.CreateAsync(entity);
            return CreatedAtAction(nameof(GetSurvey), new {id=entity.Id},entity);
        }

        [HttpPut("surveys/update/{id}"), Authorize]
        public async Task<IActionResult> UpdateSurvey(int id, Survey entity)
        {
            if (id != entity.Id) { return BadRequest();}

            var survey = await _surveyService.GetById(id);

            if(survey == null) { return NotFound(); }

            await _surveyService.UpdateAsync(survey,entity);

            return NoContent();
        }

        [HttpDelete("surveys/delete/{id}"), Authorize]
        public async Task<IActionResult> DeleteSurvey(int id)
        {
            var survey = await _surveyService.GetById(id);

            if(survey == null){ return NotFound();}
            await _surveyService.DeleteAsync(survey);
            return NoContent();
        }

        [HttpGet("questions/get"), Authorize]
        public async Task<IActionResult> GetQuestions()
        {
            var questions = await _questionService.GetAll();
            var result = _mapper.Map<List<QuestionsDTO>>(questions);
            return Ok(result);
        }

        [HttpGet("questions/get{id}")]
        public async Task<IActionResult> GetQuestions(int id)
        {
            var questions = await _questionService.GetBySurveyId(id);
            var result = _mapper.Map<List<QuestionsDTO>>(questions);
            return Ok(result);
        }

        [HttpPost("questions/create"), Authorize]
        public async Task<IActionResult> CreateQuestion(Question entity)
        {
            await _questionService.CreateAsync(entity);
            return CreatedAtAction(nameof(GetQuestions), new {id=entity.Id},entity);
        }

        [HttpPut("questions/update/{id}"), Authorize]
        public async Task<IActionResult> UpdateQuestion(int id, Question entity)
        {
            if (id != entity.Id) { return BadRequest();}

            var question = await _questionService.GetById(id);

            if(question == null) { return NotFound(); }

            await _questionService.UpdateAsync(question,entity);

            return NoContent();
        }

        [HttpDelete("questions/delete/{id}"), Authorize]
        public async Task<IActionResult> DeleteQuestion(int id)
        {
            var question = await _questionService.GetById(id);

            if(question == null){ return NotFound();}
            await _questionService.DeleteAsync(question);
            return NoContent();
        }
    }
}