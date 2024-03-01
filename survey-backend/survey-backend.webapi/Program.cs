using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using survey_backend.business.Abstract;
using survey_backend.business.Concrete;
using survey_backend.business.Configurations;
using survey_backend.data.Abstract;
using survey_backend.data.Concrete.EfCore;
using Swashbuckle.AspNetCore.Filters;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddNewtonsoftJson(options => 
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => {
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        In=ParameterLocation.Header,
        Name="Authorization",
        Type=SecuritySchemeType.ApiKey
    });

    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

builder.Services.AddDbContext<DataContext>(options => {
     options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection2"));
});

builder.Services.AddAuthorization();

builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<DataContext>();

builder.Services.AddAutoMapper(typeof(SurveyMapperConfig));
builder.Services.AddScoped<IUnitOfWork,UnitOfWork>();
builder.Services.AddScoped<IAnswerService,AnswerManager>();
builder.Services.AddScoped<IOrganizationService,OrganizationManager>();
builder.Services.AddScoped<IQuestionService,QuestionManager>();
builder.Services.AddScoped<ISurveyService,SurveyManager>();
builder.Services.AddScoped<IOptionService,OptionManager>();

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

app.MapGroup("/identity").MapIdentityApi<IdentityUser>();
app.UseAuthorization();
app.MapControllers();

app.Run();
