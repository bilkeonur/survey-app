FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5216

ENV ASPNETCORE_URLS=http://+:5216

USER app
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG configuration=Release
WORKDIR /src
COPY ["survey-backend.webapi/survey-backend.webapi.csproj", "survey-backend.webapi/"]
RUN dotnet restore "survey-backend.webapi/survey-backend.webapi.csproj"
COPY . .
WORKDIR "/src/survey-backend.webapi"
RUN dotnet build "survey-backend.webapi.csproj" -c $configuration -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "survey-backend.webapi.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "survey-backend.webapi.dll"]
