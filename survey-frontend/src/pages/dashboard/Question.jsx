import React from "react";
import { Textarea, Radio, Checkbox, Select, Option, Typography, Card, CardHeader, CardBody} from "@material-tailwind/react";
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { baseUrl } from "@/constant";

export function Question() {

  const { state: { surveyId, surveyName } = {} } = useLocation();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    fetch(baseUrl + `survey/questions/${surveyId}`)
      .then((res) => {return res.json()})
      .then((data) => {setQuestions(data)})
      .finally(() => {setLoading(false)})
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
                              <Radio key={crypto.randomUUID()} name = {"rd-" + option.questionId} color="blue" label={option.text} />
                            </div>
                          );
                        })
                      }
                      {question.answerTypeId == 2 &&
                        question.options.map((option) => {
                          return (
                            <div key={crypto.randomUUID()} className="flex gap-10">
                              <Checkbox name = {"cb-" + option.questionId} color="blue" label={option.text}/>
                            </div>
                          );
                        })
                      }
                      {question.answerTypeId == 3 &&
                        <div key={crypto.randomUUID()} className="flex gap-10">
                          <Textarea label={question.inputFormatRule}/>
                        </div>
                      }
                      {question.answerTypeId == 4 &&
                        <div key={crypto.randomUUID()} className="flex gap-10">
                          <Select label="Seçiniz">
                            {question.options.map((option) => {
                              return (
                                <Option key={crypto.randomUUID()}>{option.text}</Option>
                              );
                            })}
                          </Select>
                        </div>
                      }
                      </CardBody>
                    </Card>
                  </div>
                ))
              }
            </>
          )};
        </CardBody>
      </Card>
    </div>
  );
}

export default Question;