import React from "react";
import Select from "react-select"
import { Button, Input, Radio, Checkbox, Typography, Card, CardHeader, CardBody} from "@material-tailwind/react";
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { baseUrl } from "@/constant";
import { dateFormats } from "@/data";

export function Question() {
  
  const navigate = useNavigate();

  const location = useLocation();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const onOptionChanged = (e) => {
    let type = e.currentTarget.type;
    let optionId = e.currentTarget.id;
    let questionId = e.currentTarget.questionId;

    let selOptions = answers.find(ans => ans.questionId === questionId).selOptions;
    
    if(type=="radio") {
      selOptions.splice(0, selOptions.length);
      selOptions.push(optionId);
    }
    else if(type=="checkbox") {
      if(e.currentTarget.checked) {
        selOptions.push(optionId);
      }
      else {
        selOptions.splice(selOptions.indexOf(optionId), 1);
      }
    }
    else if(type=="textarea") {
      selOptions.splice(0, selOptions.length);
      selOptions.push(e.currentTarget.value);
    }
    else if(type=="select") {
      selOptions.splice(0, selOptions.length);
      selOptions.push(optionId);
    }
  };

  const initAnswers = (questions) => {
    
    let ansSchemas = [];
    
    questions.map((question, index) => {
      let answer = {
        surveyId: location.state.surveyId,
        questionId: question.id,
        answerTypeId:question.answerTypeId,
        isMandatory: question.isMandatory,
        inputFormatId: question.inputFormatId,
        inputFormatRule: question.inputFormatRule,
        selOptions: []
      }
      ansSchemas.push(answer);
      setAnswers(ansSchemas);
    });
  };

  const getQuestions = () => {
    setLoading(true)
    fetch(baseUrl + `questions/get${location.state.surveyId}`)
      .then((res) => {return res.json()})
      .then((data) => {
        setQuestions(data);
        initAnswers(data);
      })
      .finally(() => {setLoading(false)})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    sendSurvey();
  }

  const sendSurvey = () => {
    
    const reqObj = answers.map(answers => ({
      surveyId: answers.surveyId,
      questionId: answers.questionId,
      selOptions: String(answers.selOptions)
    }));

    console.log(JSON.stringify(reqObj));


    fetch(baseUrl + 'answers/create', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(reqObj)
    })
    .then((res) => { 
      if(res.status == 200) {
        navigate('/dashboard/survey')
      }
     })
    .catch(error => {console.log(error)});
  };

  useEffect(() => {
    getQuestions();
  }, []);
  
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            {location.state && location.state.surveyName}
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <form onSubmit={handleSubmit} className="mx-auto">
            <div className="mb-1 flex flex-col gap-6">
              <div className="mt-1">
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <>
                    {
                      questions.length > 0 ?
                        <div>
                          {questions.map((question, index) => (
                            <div key={crypto.randomUUID()} className="mx-auto my-20 flex max-w-screen-lg flex-col gap-8">
                              <Card className={question.isMandatory ? 'bg-sky-50 border-solid border-2 border-indigo-600' : 'bg-white border-solid border-2 border-indigo-200'}>
                                <CardHeader
                                  color="transparent"
                                  floated={false}
                                  shadow={false}
                                  className="m-0 p-4">
                                  <Typography variant="h5" color="blue-gray">
                                    {question.isMandatory ? question.text + " (Zorunlu Alan)" : question.text}
                                  </Typography>
                                </CardHeader>
                                <CardBody className="flex flex-col gap-4 p-4">
                                  {question.answerTypeId == 1 &&
                                    question.options.map((option) => {
                                      return (
                                        <div key={crypto.randomUUID()} className="flex gap-10">
                                          <Radio 
                                            key={option.id} 
                                            id = {option.id}
                                            name = {"rd-" + option.questionId} 
                                            color="blue" 
                                            label={option.label}
                                            onChange={(e) => onOptionChanged({currentTarget:{type:"radio", id:option.id, questionId:question.id}})}/>
                                        </div>
                                      );
                                    })
                                  }
                                  {question.answerTypeId == 2 &&
                                    question.options.map((option) => {
                                      return (
                                        <div key={crypto.randomUUID()} className="flex gap-10">
                                          <Checkbox
                                            key={option.id} 
                                            id = {option.id}
                                            name = {"cb-" + option.questionId} 
                                            color="blue" 
                                            label={option.label}
                                            onChange={(e) => onOptionChanged({currentTarget:{type:"checkbox", id:option.id, questionId:question.id, checked:e.target.checked}})}/>
                                        </div>
                                      );
                                    })
                                  }
                                  {question.answerTypeId == 3 &&
                                    <div key={crypto.randomUUID()} className="flex gap-10">
                                      <Input
                                        {...(question.inputFormatId == 2 && 
                                          {
                                            type: "number",
                                            label: "(" + JSON.parse(question.inputFormatRule).min + " - " + JSON.parse(question.inputFormatRule).max + ") Aralığında Bir Değer Giriniz"
                                          }
                                        )}
                                        {...(question.inputFormatId == 3 && 
                                          {
                                            maxLength: JSON.parse(question.inputFormatRule).max,
                                            label: "Maximum Uzunluk " + JSON.parse(question.inputFormatRule).max + " Karakter"
                                          }
                                        )}
                                        {...(question.inputFormatId == 4 && 
                                          {
                                            label: "Giriş Formatı : " + dateFormats.find(df => df.id === parseInt(question.inputFormatRule)).label + " Şeklinde Olmalıdır"
                                          }
                                        )}
                                        variant="outlined"
                                        color="blue"
                                        required={question.isMandatory}
                                        onChange={(e) => onOptionChanged({currentTarget:{type:"textarea", id:0, questionId:question.id, value:e.target.value}})}/>
                                    </div>
                                  }
                                  {question.answerTypeId == 4 &&
                                    <div key={crypto.randomUUID()} className="flex gap-10">
                                      <Select
                                        className="peer w-full"
                                        color="blue"
                                        onChange={(e) => onOptionChanged({currentTarget:{type:"select", id:e.id, questionId:question.id}})}
                                        options={question.options}/>
                                    </div>
                                  }
                                </CardBody>
                              </Card>
                            </div>
                          ))}
                          <div>
                            <Button type="submit">
                              Anketi Gönder
                            </Button>
                          </div>
                        </div>
                      :
                        <div>
                          <Typography className="ml-6" variant="h6" color="black">
                              <i className="fa-solid fa-circle-info mr-2"></i>
                              Bu Anket Soru İçermemektedir
                          </Typography>
                        </div>
                    }
                  </>
                )}
              </div>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default Question;