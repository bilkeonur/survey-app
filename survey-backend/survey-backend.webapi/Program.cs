using Microsoft.EntityFrameworkCore;
using survey_backend.business.Abstract;
using survey_backend.business.Concrete;
using survey_backend.data.Abstract;
using survey_backend.data.Concrete.EfCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("MySqlConnection2");

builder.Services.AddDbContext<DataContext>(options => {
     options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

builder.Services.AddScoped<IUnitOfWork,UnitOfWork>();
builder.Services.AddScoped<IAnswerTypeService,AnswerTypeManager>();
builder.Services.AddScoped<IOrganizationService,OrganizationManager>();
builder.Services.AddScoped<IQuestionService,QuestionManager>();
builder.Services.AddScoped<ISurveyService,SurveyManager>();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("../swagger/v1/swagger.json", "Test API V1");
    c.RoutePrefix = string.Empty;
});

app.UseCors(builder => builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader()
);   

app.UseAuthorization();
app.MapControllers();

app.Run();
