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

        [HttpGet("answertypes/get"), Authorize]
        public async Task<IActionResult> GetAnswerTypes()
        {
            var answerTypes = await _answerTypeService.GetAll();
            return Ok(answerTypes);
        }

        [HttpGet("answertypes/get{id}"), Authorize]
        public async Task<IActionResult> GetAnswerType(int id)
        {
            var answerType = await _answerTypeService.GetById(id);
            
            if(answerType == null) return NotFound();
            else return Ok(answerType);
        }

        [HttpPost("answertypes/create"), Authorize]
        public async Task<IActionResult> CreateAnswerType(AnswerType entity)
        {
            await _answerTypeService.CreateAsync(entity);
            return CreatedAtAction(nameof(GetAnswerType), new {id=entity.Id},entity);
        }

        [HttpPut("answertypes/update/{id}"), Authorize]
        public async Task<IActionResult> UpdateAnswerType(int id, AnswerType entity)
        {
            if (id != entity.Id) { return BadRequest();}

            var answerType = await _answerTypeService.GetById(id);

            if(answerType == null) { return NotFound(); }

            await _answerTypeService.UpdateAsync(answerType,entity);

            return NoContent();
        }

        [HttpDelete("answertypes/delete/{id}"), Authorize]
        public async Task<IActionResult> DeleteAnswerType(int id)
        {
            var answerType = await _answerTypeService.GetById(id);

            if(answerType == null){ return NotFound();}
            await _answerTypeService.DeleteAsync(answerType);
            return NoContent();
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

        [HttpGet("questions/get{id}")]
        public async Task<IActionResult> GetQuestions(int id)
        {
            var questions = await _questionService.GetBySurveyId(id);
            var result = _mapper.Map<List<QuestionsDTO>>(questions);
            return Ok(result);
        }
    }
}