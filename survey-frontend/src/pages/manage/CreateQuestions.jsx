import { useState, useEffect, useRef } from 'react';
import Select from "react-select"
import { object, string} from 'yup';
import { useNavigate, useLocation } from "react-router-dom"
import { IconButton, Checkbox, Input, Button, Typography, Card, CardHeader, CardBody} from "@material-tailwind/react";
import { baseUrl } from "@/constant";
import { answerTypes, dateFormats, inputFormats } from "@/data";

export function CreateQuestions() {
  
  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef();

  const [inpQuestion, setInpQuestion] = useState("");
  const [inpAnswerTypeId, setInpAnswerTypeId] = useState(0);
  const [inpInputFormatId, setInpInputFormatId] = useState(0);
  const [inpDateFormatId, setInpDateFormatId] = useState(0);
  const [inpMinValue, setInpMinValue] = useState(0);
  const [inpMaxValue, setInpMaxValue] = useState(0);
  const [inpIsMandatory, setInpIsMandatory] = useState(true);
  let [inpOptions, setInpOptions] = useState([]);
  let [inpOptionCount, setInpOptionCount] = useState(2);

  const [formMode, setFormMode] = useState(0);
  const [questions, setQuestions] = useState([]);
    
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getQuestions();
  }, []);

  const validationSchema = object({
    text: string()
      .required("Soru Girmelisiniz")
      .min(3,"Soru Minimum 3 Karakter Olmalıdır")
      .max(80,"Soru Maximum 150 Karakter Olmalıdır")
  });

  const initForm = () => {   
    setFormMode(0); 
    setInpQuestion("");
    setInpAnswerTypeId(0);
    setInpAnswerTypeText("");
    setInpInputFormatId(0);
    setInpDateFormatId(0);
    setInpMinValue(0);
    setInpMaxValue(0);
    setInpIsMandatory(true)
    initOptions();
  }

  const initOptions = () => {
    setInpOptions([
      {id: crypto.randomUUID(), label:""},
      {id: crypto.randomUUID(), label:""}
    ]);

    setInpOptionCount(2);
  }

  const addOption = () => {
    let newOption = {id: crypto.randomUUID(), label:""};
    setInpOptions(current => [...current, newOption]);
    setInpOptionCount(++inpOptionCount);
  }

  const deleteOption = (id) => {
    if(inpOptionCount > 2) {
      let tmpOptions = [...inpOptions];
      let curOption = inpOptions.find(opt => opt.id === id);
      let curIndex = inpOptions.indexOf(curOption);
      tmpOptions.splice(curIndex, 1);
      setInpOptions(tmpOptions);
      setInpOptionCount(--inpOptionCount);
    }
  }

  const getQuestions = () => {
    setLoading(true)
    fetch(baseUrl + `questions/get${location.state.survey.id}`)
      .then((res) => {return res.json()})
      .then((data) => {setQuestions(data)})
      .finally(() => {setLoading(false)})
  };

  const handleChange = (e) => {
    let targetId = e.target.id;
    let targetName = e.target.name;
    let targetValue = e.target.value;

    console.log(e);

    if(targetName == "text") {
      setInpQuestion(targetValue);
    }
    else if(targetName == "answerTypeId") {
      initOptions();
      setInpAnswerTypeId(targetValue);
      setInpInputFormatId(0);
      setInpDateFormatId(0);
    }
    else if(targetName == "inputFormatId") {
      setInpInputFormatId(targetValue);
      setInpDateFormatId(0);
    }
    else if(targetName == "dateFormatId") {
      setInpDateFormatId(targetValue);
    }
    else if(targetName == "inpOption") {
      inpOptions.find(opt => opt.id === targetId).label = targetValue;
    }
    else if(targetName == "minimum") {
      setInpMinValue(targetValue);
    }
    else if(targetName == "maximum") {
      setInpMaxValue(targetValue);
    }
    else if(targetName == "isMandatory") {
      setInpIsMandatory(targetValue);
    }
  };

  const createQuestion = (reqData) => {
    fetch(baseUrl + 'questions/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(reqData)
    })
    .then((res) => {
      if(res.status == 201) {initForm();getQuestions();}
      else if(res.status == 401) {navigate('/auth/signin')}})
    .catch(error => {alert("Hata Oluştu : " + error.inner)});
  }

  const editQuestion = (question) => {
    console.log(question);
    setFormMode(1);
    setInpQuestion(question.text);
    setInpAnswerTypeId(question.answerTypeId);
    setInpOptions(question.options.map(opt => {return { id: opt.id, label: opt.label }}));
    setInpOptionCount(question.options.length);
  }

  const deleteQuestion = (id) => {
    fetch(baseUrl + `questions/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
      }
    })
    .then((res) => { 
      if(res.status==401) {navigate('/auth/signin')}
      else if(res.status==204) {getQuestions()}
    })
    .catch(error => {console.log(error)});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    
    let inputFormatRule = "";

    if(inpInputFormatId == 2 || inpInputFormatId == 3) {
      inputFormatRule = JSON.stringify({min:parseInt(inpMinValue), max:parseInt(inpMaxValue)});
    }
    else if(inpInputFormatId == 4) {
      inputFormatRule = String(inpDateFormatId);
    }

    let reqData = {
      surveyId: location.state.survey.id,
      answerTypeId: inpAnswerTypeId,
      isMandatory: inpIsMandatory,
      inputFormatId: inpInputFormatId,
      inputFormatRule: inputFormatRule,
      text: inpQuestion,
    }

    if(inpOptions[0].label != "") {
      reqData["options"] = inpOptions.map(option => {return { label:option.label }});
    }
    
    console.log(JSON.stringify(reqData));

    try {
      await validationSchema.validate(reqData, {abortEarly: false});
      if(formMode == 0) {createQuestion(reqData)}
    } 
    catch (error) {
      const newErrors = {};
      console.log(error);
      error.inner.forEach((er) =>{
        newErrors[er.path] = er.message;
      });

      setErrors(newErrors);
    }
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            {location.state && location.state.survey.title}
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div className="mx-auto flex max-w-screen-lg flex-col gap-8">
            <Card>
              <CardHeader
                variant="gradient" 
                color="gray"
                floated={false}
                shadow={true}
                className="m-0 mb-8 rounded border-b border-white/10 pb-8 text-center">
              </CardHeader>
              <form onSubmit={handleSubmit} className="mt-2 mb-2 ml-10 mr-10">
                <div className="mb-1 flex flex-col gap-6">
                  <div className="mt-1">
                    <Input
                      ref={inputRef}
                      name="text"
                      value={inpQuestion}
                      color="blue" 
                      label="Soru"
                      size="lg"
                      placeholder="Soru Giriniz"
                      icon={<i className="fa-solid fa-clipboard-question"/>}
                      onChange={(e) => handleChange({target:{id:1, name:"text", value:e.target.value}})}
                      autoFocus
                      required/>
                      {errors.text &&
                        <Typography
                          variant="small"
                          color="gray"
                          className="mt-2 flex items-center gap-1 font-normal">
                          <i className="fa-solid fa-circle-info"></i>
                          {errors.text}
                        </Typography>
                      }
                  </div>
                  <div className="mt-1">
                    <Select
                      name="answertype"
                      placeholder="Yanıt Tipi Seçiniz"
                      required
                      color="blue"
                      defaultValue={inpAnswerTypeId !=0 && {label:(answerTypes.find(at => at.id === inpAnswerTypeId)).label}}
                      onChange={(e) => handleChange({target:{id:1, name:"answerTypeId", value:e.id}})}
                      options={answerTypes}/>
                </div>
                {
                  (inpAnswerTypeId == 1 || inpAnswerTypeId == 2 || inpAnswerTypeId == 4) ?
                    <div className="mt-1">
                      <div>
                        <Button 
                          onClick={addOption}
                          ripple={true} 
                          color="red" 
                          className="mb-6" 
                          fullWidth>
                            Seçenek Ekle
                        </Button>
                      </div>
                      
                      <div>
                        {inpOptions && inpOptions.map(({ id, label}, key) => {
                          return (
                            <div key={crypto.randomUUID()} className="mt-3 flex items-center">
                              {inpAnswerTypeId == 1 && <i className="fa-solid fa-circle-dot pr-2"/>}
                              {inpAnswerTypeId == 2 && <i className="fa-solid fa-square-check pr-2"/>}
                              {inpAnswerTypeId == 4 && <i className="fa-solid fa-list pr-2"/>}
                              <Input
                                name={"opt" + id}
                                label="Seçenek"
                                defaultValue={label}
                                color="blue"
                                size="lg"
                                onChange={(e) => handleChange({target:{id:id, name:"inpOption", value:e.target.value}})}
                                containerProps={{ className: "min-w-0" }}
                                icon={<i onClick={(e) => deleteOption(id)} className="fa-solid fa-trash"/>}
                                required/>
                              </div>
                            );
                          })
                        }
                      </div>
                    </div>
                  : inpAnswerTypeId == 3 ?
                    <div className="mt-0">
                      <div>
                        <Select
                          name="inputFormat"
                          placeholder="Giriş Tipi Seçiniz"
                          required
                          color="blue"
                          onChange={(e) => handleChange({target:{id:1, name:"inputFormatId", value:e.id}})}
                          options={inputFormats}/>
                      </div>
                      <div>
                        {(inpInputFormatId == 2 || inpInputFormatId == 3) ?
                          <div className="mt-7 flex items-center space-x-6">
                            <Input
                              name= "minimum"
                              value={inpMinValue}
                              type="number"
                              color="blue" 
                              size="lg"
                              containerProps={{ className: "min-w-0" }}
                              icon={<i className="fa-solid fa-square-minus"/>}
                              onChange={(e) => handleChange({target:{id:1, name:"minimum", value:e.target.value}})}
                              required/>
                            <Input
                              name="maximum"
                              value={inpMaxValue}
                              type="number"
                              color="blue" 
                              label="Maximum"
                              size="lg"
                              containerProps={{ className: "min-w-0" }}
                              icon={<i className="fa-solid fa-square-plus"/>}
                              onChange={(e) => handleChange({target:{id:1, name:"maximum", value:e.target.value}})}
                              required/>
                          </div>  
                        :
                          <div className="mt-7">
                            <Select
                              name="dateFormatId"
                              label="Tarih Formatı"
                              placeholder="Tarih Formatı"
                              required
                              color="blue"
                              onChange={(e) => handleChange({target:{id:1,name:"dateFormatId", value:e.id}})}
                              options={dateFormats}/>
                          </div>
                        }
                      </div>
                    </div>
                  :
                    <div className="mt-0">
                    </div>
                }
                </div>
                <div className="mt-4">
                  <Checkbox
                    name = "isMandatory"
                    color="blue" 
                    label= "Zorunlu Seçim"
                    onChange={(e) => handleChange({target:{id:1, name:"isMandatory", value:e.target.checked}})}
                    defaultChecked = {true}/>
                </div>
                <div className="mt-10 mb-7">
                  <Button type="submit" className="mt-6" fullWidth>
                    Soru Ekle
                  </Button>
                </div>
              </form>
            </Card>
          </div>
          <div className="mt-1">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <>
                {
                  questions && questions.map((question, index) => (
                    <div key={crypto.randomUUID()} className="mx-auto my-20 flex max-w-screen-lg flex-col gap-8">
                      <Card>
                        <CardHeader
                          floated={false}
                          shadow={true}
                          className="bg-blue-500 m-0 mb-8 rounded border-b border-white/10 pb-8 text-center">
                        </CardHeader>
                        <form className="mt-2 mb-2 ml-10 mr-10">
                          <div className="mb-1 flex flex-col gap-6">
                            <div className="mt-1">
                              <Input
                                name="question"
                                color="blue" 
                                label="Soru"
                                size="lg"
                                placeholder="Soru Giriniz"
                                icon={<i className="fa-solid fa-clipboard-question"/>}
                                disabled={true}
                                defaultValue = {question.text}/>
                                {errors.title &&
                                  <Typography
                                    variant="small"
                                    color="gray"
                                    className="mt-2 flex items-center gap-1 font-normal">
                                    <i className="fa-solid fa-circle-info"></i>
                                    {errors.title}
                                  </Typography>
                                }
                            </div>
                            <div className="mt-1">
                              <Select
                                name="answertype"
                                placeholder="Yanıt Tipi Seçiniz"
                                isDisabled={true}
                                color="blue"
                                defaultValue={question.answerType && {label:question.answerType.label}}
                                options={answerTypes}/>
                            </div>
                            {(question.answerTypeId == 1 || question.answerTypeId == 2 || question.answerTypeId == 4) ?
                              <div>
                                <div>
                                  {question.options && question.options.map((option) => {
                                    return (
                                      <div key={crypto.randomUUID()} className="mt-3 flex items-center">
                                        {question.answerTypeId == 1 && <i className="fa-solid fa-circle-dot pr-2"/>}
                                        {question.answerTypeId == 2 && <i className="fa-solid fa-square-check pr-2"/>}
                                        {question.answerTypeId == 4 && <i className="fa-solid fa-list pr-2"/>}
                                        <Input
                                          label="Seçenek"
                                          name={"opt-" + option.label}
                                          defaultValue={option.label}
                                          disabled={true}
                                          color="blue"
                                          size="lg"/>
                                        </div>
                                      );
                                    })
                                  }
                                </div>
                              </div>
                            :
                              <div className="mt-0">
                                <div>
                                  <Select
                                    name="inputFormat"
                                    placeholder="Giriş Tipi Seçiniz"
                                    color="blue"
                                    isDisabled={true}
                                    defaultValue={{label:inputFormats.find(ift => ift.id === question.inputFormatId).label}}
                                    options={inputFormats}/>
                                </div>
                                <div>
                                {(question.inputFormatId == 2 || question.inputFormatId == 3) ?
                                  <div key={crypto.randomUUID()} className="mt-7 flex items-center space-x-6">
                                    <Input
                                      name={"minimum"}
                                      type="number"
                                      color="blue" 
                                      label={"Minimum"}
                                      defaultValue={(JSON.parse(question.inputFormatRule)).min}
                                      size="lg"
                                      containerProps={{ className: "min-w-0" }}
                                      icon={<i className="fa-solid fa-square-minus"/>}
                                      disabled={true}/>
                                    <Input
                                      name={"maximum"}
                                      type="number"
                                      color="blue" 
                                      label={"Maximum"}
                                      defaultValue={(JSON.parse(question.inputFormatRule)).max}
                                      size="lg"
                                      containerProps={{ className: "min-w-0" }}
                                      icon={<i className="fa-solid fa-square-plus"/>}
                                      disabled={true}/>
                                  </div>  
                                :
                                  <div className="mt-7">
                                    <Select
                                      name="dateFormat"
                                      placeholder="Tarih Formatı"
                                      color="blue"
                                      defaultValue={{label:dateFormats.find(dtf => dtf.id === parseInt(question.inputFormatRule)).label}}
                                      options={dateFormats}
                                      isDisabled={true}/>
                                  </div>
                                }
                                </div>
                              </div>
                            }
                            <div>
                              <Checkbox
                                name = "isActive"
                                color="blue" 
                                label= "Zorunlu Seçim"
                                disabled={true}
                                defaultChecked = {question.isMandatory}/>
                            </div>
                            <div className="flex md:flex md:flex-grow flex-row justify-end space-x-5">
                              <IconButton 
                                onClick={(e) => editQuestion(question)}
                                color="blue">
                                  <i className="fa-solid fa-pen-to-square" />
                              </IconButton>
                              <IconButton 
                                onClick={(e) => deleteQuestion(question.id)} 
                                color="red">
                                  <i className="fa fa-trash" />
                              </IconButton>
                            </div>
                          </div>
                        </form>
                      </Card>
                    </div>
                  ))
                }
              </>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default CreateQuestions;