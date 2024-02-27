import { useState, useEffect, useRef } from 'react';
import { object, string} from 'yup';
import { useNavigate, useLocation } from "react-router-dom"
import { Input, Button, Typography, Card, CardHeader, CardBody} from "@material-tailwind/react";
import { baseUrl } from "@/constant";

export function CreateAnswerType() {
  
  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [formMode, setFormMode] = useState();
  const [formData, setFormData] = useState({answerTypeName: ""});
  const [errors, setErrors] = useState({});
  const [answerType, setAnswerType] = useState({});

  useEffect(() => {
    if(location.state != null) {
      setFormMode(1);
      setAnswerType(location.state.answerType);
    }
    else {
      setFormMode(0);
    }

    inputRef.current.focus();
  }, []);

  const validationSchema = object({
    answerTypeName: string()
      .required("Cevap Türü Girmelisiniz")
      .min(3,"Cevap Türü Minimum 3 Karakter Olmalıdır")
      .max(80,"Cevap Türü Maximum 80 Karakter Olmalıdır")
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const createAnswerType = () => {
    fetch(baseUrl + 'answertypes/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({name: formData.answerTypeName})
    })
    .then((res) => { 
      if(res.status == 201) { navigate('/manage/answertypemanagement')}
      else {alert("Hata Oluştu")}
      return res.json()
    })
    .catch(error => {alert("Hata Oluştu : " + error.inner)});
  };

  const updateAnswerType = (id) => {
    fetch(baseUrl + `answertypes/update/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({id: id, name: formData.answerTypeName})
    })
    .then((res) => { navigate('/manage/answertypemanagement')})
    .catch(error => {alert("Hata Oluştu : " + error.inner)});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    
    try {
      await validationSchema.validate(formData, {abortEarly: false});
      if(formMode == 0) {createAnswerType()}
      else {updateAnswerType(answerType.id)}
    } 
    catch (error) {
      const newErrors = {};

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
            {formMode == 0 ? "Cevap Tipi Ekle" : "Cevap Tipi Düzenle"}
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
            <div className="mb-1 flex flex-col gap-6">
              <div className="mt-1">
                <Input 
                  ref={inputRef}
                  name="answerTypeName"
                  color="blue" 
                  label="Cevap Tipi"
                  size="lg"
                  placeholder="Cevap Tipi Giriniz"
                  icon={<i className="fa-solid fa-building"/>}
                  required
                  onChange={handleChange}
                  defaultValue = {answerType.name}
                  autoFocus />
                  {errors.answerTypeName &&
                    <Typography
                      variant="small"
                      color="gray"
                      className="mt-2 flex items-center gap-1 font-normal">
                      <i className="fa-solid fa-circle-info"></i>
                      {errors.answerTypeName}
                    </Typography>
                  }
              </div>
            </div>
            <Button type="submit" className="mt-6" fullWidth>
              Kaydet
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default CreateAnswerType;