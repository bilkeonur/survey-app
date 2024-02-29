import { useState, useEffect, useRef } from 'react';
import Select from "react-select"
import { object, string} from 'yup';
import { useNavigate, useLocation } from "react-router-dom"
import { IconButton, Checkbox, Input, Button, Typography, Card, CardHeader, CardBody} from "@material-tailwind/react";
import { baseUrl } from "@/constant";

export function CreateQuestions() {
  
  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef();

  const [formMode, setFormMode] = useState(0);
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answerType, setAnswerType] = useState(0);
  const [answerTypes, setAnswerTypes] = useState({});
  const [inputFormat, setInputFormat] = useState(0);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [dateFormat, setDateFormat] = useState(0);
  const [isMandatory, setIsMandatory] = useState(true);
    
  let [options, setOptions] = useState([
    {id: crypto.randomUUID(), text:""},
    {id: crypto.randomUUID(), text:""}
  ]);

  let [optionCount, setOptionCount] = useState(2);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const inputFormats = [
    {id:2,label:"Numerik"},
    {id:3,label:"Alfanumerik"},
    {id:4,label:"Tarih"}
  ]

  const dateFormats = [
    {id:1,label:"gg/aa/yyyy"},
    {id:2,label:"aa/gg/yyyy"},
    {id:3,label:"yyyy/aa/gg"},
    {id:4,label:"yyyy/gg/aa"}
  ]

  useEffect(() => {
    getQuestions();
    getAnswerTypes();
  }, []);

  const validationSchema = object({
    text: string()
      .required("Soru Girmelisiniz")
      .min(3,"Soru Minimum 3 Karakter Olmalıdır")
      .max(80,"Soru Maximum 150 Karakter Olmalıdır")
  });

  const addOption = () => {
    let newOption = {id: crypto.randomUUID(), text:""};
    setOptions(current => [...current, newOption]);
    setOptionCount(++optionCount);
  }

  const deleteOption = (id) => {
    if(optionCount > 2) {
      let tmpOptions = [...options];
      let curOption = options.find(opt => opt.id === id);
      let curIndex = options.indexOf(curOption);
      tmpOptions.splice(curIndex, 1);
      setOptions(tmpOptions);
      setOptionCount(--optionCount);
    }
  }

  const getQuestions = () => {
    setLoading(true)
    fetch(baseUrl + `questions/get${location.state.survey.id}`)
      .then((res) => {return res.json()})
      .then((data) => {
        setQuestions(data);
      })
      .finally(() => {setLoading(false)})
  };

  const getAnswerTypes = () => {
    fetch(baseUrl + 'answertypes/get')
      .then((res) => {return res.json()})
      .then((data) => {setAnswerTypes(data)})
  }; 

  const handleChange = (e) => {
    let targetId = e.target.id;
    let targetName = e.target.name;
    let targetValue = e.target.value;

    if(targetName == "text") {
      setQuestion(targetValue);
    }
    else if(targetName == "answerTypeId") {
      setAnswerType(targetValue);
      setInputFormat(0);
      setDateFormat(0);
    }
    else if(targetName == "inputFormatId") {
      setInputFormat(targetValue);
      setDateFormat(0);
    }
    else if(targetName == "dateFormatId") {
      setDateFormat(targetValue);
    }
    else if(targetName == "inpOption") {
      options.find(opt => opt.id === targetId).text = targetValue;
    }
    else if(targetName == "isMandatory") {
      setIsMandatory(targetValue);
    }
    else if(targetName == "minimum") {
      //setMinValue(targetValue);
    }
    else if(targetName == "maximum") {
      //setMaxValue(targetValue);
    }
  };

  const createQuestion = (e,reqData) => {
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
      if(res.status==401) {navigate('/auth/signin')}
      else {return res.json()}})
    .then((data) => {
      let questionId = data.id;
      createOptions(questionId)})
    .catch(error => {alert("Hata Oluştu : " + error.inner)});
  }

  const createOptions = (questionId) => {
    const optArray = options.map(option => {return { questionId: questionId, label:option.text }});
    console.log(JSON.stringify(optArray));
    fetch(baseUrl + 'options/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(optArray)
    })
    .then((res) => { 
      if(res.status==401) {navigate('/auth/signin')}
      else {window.location.reload()}
    })
    .catch(error => {alert("Hata Oluştu : " + error.inner)});
  }

  const editQuestion = (id) => {
    console.log("OKK " + id);
    inputRef.current.focus();
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

    if(inputFormat == 2 || inputFormat == 3) {
      inputFormatRule = JSON.stringify({min:minValue, max:maxValue});
    }
    else if(inputFormat == 4) {
      inputFormatRule = String(dateFormat);
    }
    else {
      inputFormatRule = "";
    }

    let reqData = {
      surveyId: location.state.survey.id,
      answerTypeId:answerType,
      isMandatory:isMandatory,
      inputFormatId:inputFormat,
      inputFormatRule:inputFormatRule,
      text:question
    }

    try {
      await validationSchema.validate(reqData, {abortEarly: false});
      if(formMode == 0) {createQuestion(e,reqData)}
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
                      defaultValue={answerType && {label:answerType.label}}
                      onChange={(e) => handleChange({target:{id:1, name:"answerTypeId", value:e.id}})}
                      options={answerTypes}/>
                </div>
                {(answerType == 1 || answerType == 2 || answerType == 4) ?
                  <div className="mt-1">
                    <div>
                      <Button onClick={addOption} ripple={true} color="red" className="mb-6" fullWidth>
                        Seçenek Ekle
                      </Button>
                    </div>
                    
                    <div>
                      {options && options.map(({ id, text}, key) => {
                        return (
                          <div key={crypto.randomUUID()} className="mt-3 flex items-center">
                            {answerType == 1 && <i className="fa-solid fa-circle-dot pr-2"/>}
                            {answerType == 2 && <i className="fa-solid fa-square-check pr-2"/>}
                            {answerType == 4 && <i className="fa-solid fa-list pr-2"/>}
                            <Input
                              name={"opt" + id}
                              label="Seçenek"
                              defaultValue={text}
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
                :
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
                      {(inputFormat == 2 || inputFormat == 3) ?
                        <div key={crypto.randomUUID()} className="mt-7 flex items-center space-x-6">
                          <Input
                            name= "minimum"
                            type="number"
                            color="blue" 
                            size="lg"
                            containerProps={{ className: "min-w-0" }}
                            icon={<i className="fa-solid fa-square-minus"/>}
                            onChange={(e) => handleChange({target:{id:1, name:"minimum", value:e.target.value}})}
                            required/>
                          <Input
                            name="maximum"
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
                  questions && questions.map(({ id,text,answerType,options,inputFormatId,inputFormatRule,isMandatory }, index) => (
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
                                defaultValue = {text}/>
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
                                defaultValue={answerType && {label:answerType.label}}
                                options={answerTypes}/>
                            </div>
                            {(answerType.id == 1 || answerType.id == 2 || answerType.id == 4) ?
                              <div>
                                <div>
                                  {options && options.map((option) => {
                                    return (
                                      <div key={crypto.randomUUID()} className="mt-3 flex items-center">
                                        {answerType.id == 1 && <i className="fa-solid fa-circle-dot pr-2"/>}
                                        {answerType.id == 2 && <i className="fa-solid fa-square-check pr-2"/>}
                                        {answerType.id == 4 && <i className="fa-solid fa-list pr-2"/>}
                                        <Input
                                          label="Seçenek"
                                          name={"opt" + options.label}
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
                                    required
                                    color="blue"
                                    isDisabled={true}
                                    defaultValue={{label:inputFormats.find(ift => ift.id === inputFormatId).label}}
                                    options={inputFormats}/>
                                </div>
                                <div>
                                {(inputFormatId == 2 || inputFormatId == 3) ?
                                  <div key={crypto.randomUUID()} className="mt-7 flex items-center space-x-6">
                                    <Input
                                      name={"minimum"}
                                      type="number"
                                      color="blue" 
                                      label={"Minimum"}
                                      defaultValue={(JSON.parse(inputFormatRule)).min}
                                      size="lg"
                                      containerProps={{ className: "min-w-0" }}
                                      icon={<i className="fa-solid fa-square-minus"/>}
                                      disabled={true}/>
                                    <Input
                                      name={"maximum"}
                                      type="number"
                                      color="blue" 
                                      label={"Maximum"}
                                      defaultValue={(JSON.parse(inputFormatRule)).max}
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
                                      defaultValue={{label:dateFormats.find(dtf => dtf.id === parseInt(inputFormatRule)).label}}
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
                                defaultChecked = {isMandatory}/>
                            </div>
                            <div className="flex md:flex md:flex-grow flex-row justify-end space-x-5">
                              <IconButton 
                                onClick={(e) => editQuestion(id)}
                                color="blue">
                                  <i className="fa-solid fa-pen-to-square" />
                              </IconButton>
                              <IconButton 
                                onClick={(e) => deleteQuestion(id)} 
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