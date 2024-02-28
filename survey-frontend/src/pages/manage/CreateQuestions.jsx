import { useState, useEffect, useRef } from 'react';
import Select from "react-select"
import { object, string} from 'yup';
import { useNavigate, useLocation } from "react-router-dom"
import { Input, Button, Typography, Card, CardHeader, CardBody} from "@material-tailwind/react";
import { baseUrl } from "@/constant";

export function CreateQuestions() {
  
  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef();

  const [answerTypes, setAnswerTypes] = useState({});
  let [options, setOptions] = useState([
    {id: crypto.randomUUID(), text:""},
    {id: crypto.randomUUID(), text:""}]);
  let [answerType, setAnswerType] = useState(0);
  let [optionCount, setOptionCount] = useState(2);
  const [errors, setErrors] = useState({});

  const inputFormats = [
    {id:2,label:"Numerik"},
    {id:3,label:"Alfanumerik"},
    {id:4,label:"Tarih"}
  ]

  const addOption = () => {
    let newOption = {id: crypto.randomUUID(), text:""};
    setOptions(current => [...current, newOption]);
    setOptionCount(++optionCount);
  }

  const deleteOption = (id) => {
    if(optionCount > 2) {
      let tmpOptions = [...options];
      tmpOptions.splice(tmpOptions.indexOf(id), 1);
      setOptions(tmpOptions);
      setOptionCount(--optionCount);
    }
  }

  const handleOptionChange  = (value,id) => {
    console.log(value);
    console.log(id);
    //let tmpOptions = [...options];
    //let curOption = tmpOptions.find(opt => opt.id === id)
    //tmpOptions.splice(curOption, 1, {id: id, text:value});
    //setOptions(curOption);
  }

  useEffect(() => {
    getAnswerTypes();
  }, []);

  const getAnswerTypes = () => {
    fetch(baseUrl + 'answertypes/get', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
    })
    .then((res) => {return res.json()})
    .then((data) => {setAnswerTypes(data)})
  }; 

  const handleChange = (e) => {
    console.log(e);
    if(e.target.name == "answerTypeId") {
      let answerTypeId = e.target.value;
      setAnswerType(answerTypeId);
    }
  };

  const handleSubmit = async (e) => {
    console.log(options);
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            {"Seçenek Ekle"}
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
            <div className="mb-1 flex flex-col gap-6">
              <div className="mt-1">
                <Input
                  ref={inputRef}
                  name="question"
                  color="blue" 
                  label="Soru"
                  size="lg"
                  placeholder="Soru Giriniz"
                  icon={<i className="fa-solid fa-clipboard-question"/>}
                  required
                  onChange={handleChange}/>
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
                  required
                  color="blue"
                  onChange={(e) => handleChange({target:{name:"answerTypeId", value:e.id}})}
                  autoFocus
                  options={answerTypes}/>
              </div>
              {(answerType == 1 || answerType == 2 || answerType == 4) &&
                <div className="mt-1">
                  <Button 
                    color="red"
                    ripple={true}
                    onClick={addOption} className="mt-2" fullWidth>
                    Seçenek Ekle
                  </Button>
                </div>
              }
              <div className="mt-1">
                {(answerType == 1 || answerType == 2 || answerType == 4) && options && options.map((option) => {
                  return (
                    <div key={crypto.randomUUID()} className="mt-3 flex items-center">
                      {answerType == 1 && <i className="fa-solid fa-circle-dot pr-2"/>}
                      {answerType == 2 && <i className="fa-solid fa-square-check pr-2"/>}
                      {answerType == 4 && <i className="fa-solid fa-list pr-2"/>}
                      <Input
                        name={"opt" + option.text}
                        color="blue" 
                        label={"Seçenek " + option.text}
                        size="lg"
                        onChange={(e) => handleOptionChange(e.target.value,option.id)}
                        containerProps={{ className: "min-w-0" }}
                        icon={<i onClick={(e) => deleteOption(option.id)} className="fa-solid fa-trash"/>}
                        required/>
                      </div>
                    );
                  })
                }
                {answerType == 3 &&
                  <div key={crypto.randomUUID()} className="mt-3 flex items-center">
                    <Select
                      name="inputFormat"
                      placeholder="Giriş Tipi Seçiniz"
                      required
                      color="blue"
                      options={inputFormats}/>
                  </div>
                }
              </div>
            </div>
            <Button ripple={true} type="submit" className="mt-6" fullWidth>
              Kaydet
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default CreateQuestions;