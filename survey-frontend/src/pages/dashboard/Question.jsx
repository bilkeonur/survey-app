import React from "react";
import Select from "react-select"
import { Button, Textarea, Radio, Checkbox, Typography, Card, CardHeader, CardBody} from "@material-tailwind/react";
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { baseUrl } from "@/constant";

export function Question() {
  
  const navigate = useNavigate();

  const { state: { surveyId, surveyName } = {} } = useLocation();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState();
  const [loading, setLoading] = useState(false);

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
        surveyId: surveyId,
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
    fetch(baseUrl + `questions/get${surveyId}`)
      .then((res) => {return res.json()})
      .then((data) => {
        setQuestions(data);
        initAnswers(data);
      })
      .finally(() => {setLoading(false)})
  };

  const sendSurvey = () => {
    
    var reqObj = JSON.stringify(answers, function(key, value) {
      if (key === 'selOptions') {return String(value);}
      return value;
    });

    console.log(reqObj);
    fetch(baseUrl + 'answers/create', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: reqObj
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
            {surveyName}
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              {
                questions.map((question, index) => (
                  <div key={crypto.randomUUID()} className="mx-auto my-20 flex max-w-screen-lg flex-col gap-8">
                    <Card className={question.isMandatory ? 'bg-gray-200' : 'bg-white'}>
                      <CardHeader
                        color="transparent"
                        floated={false}
                        shadow={false}
                        className="m-0 p-4">
                        <Typography variant="h5" color="blue-gray">
                          {question.text}
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
                            <Textarea 
                              label={question.inputFormatRule}
                              onChange={(e) => onOptionChanged({currentTarget:{type:"textarea", id:0, questionId:question.id, value:e.target.value}})}/>
                          </div>
                        }
                        {question.answerTypeId == 4 &&
                          <Select
                            className="flex gap-10"
                            color="blue"
                            onChange={(e) => onOptionChanged({currentTarget:{type:"select", id:e.id, questionId:question.id}})}
                            options={question.options}/>
                        }
                      </CardBody>
                    </Card>
                  </div>
                ))
              }
            </>
          )}
          <div className="flex flex-col items-center pt-1 pb-5 pl-10 pr-10">
            <Button onClick={sendSurvey} fullWidth>
              Anketi Gönder
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Question;