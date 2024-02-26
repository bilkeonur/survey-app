import { useState } from 'react';
import { object, string, ref} from 'yup';
import { Input, Card, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom"
import { baseUrl } from "@/constant";

export function SignUp() {

  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({email: "", password: ""});
  const [errors, setErrors] = useState({});

  const validationSchema = object({
    email: string()
      .email("Email Formatı Uygun Değil")
      .required("Email Adresi Girmelisiniz"),
    password: string()
      .required("Şifrenizi Girmelisiniz")
      .min(4,"Şifre Minimum 4 Karakter Olmalıdır")
      .max(10,"Şifre Maximum 10 Karakter Olmalıdır"),
    repassword: string()
      .oneOf([ref('password'), null], 'Şifreniz Eşleşmiyor')
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const signUp = () => {
    fetch(baseUrl + 'identity/register', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({email: formData.email, password: formData.password})
    })
    .then((res) => { if(res.status == 200) {navigate('/auth/signin')} })
    .catch(error => {console.log(error)});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    try {
      await validationSchema.validate(formData, {abortEarly: false});
      signUp();
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
    <div className="h-screen w-full flex justify-center items-center bg-blue-gray-50/50">
      <Card className="w-1/4 h-auto pt-5 pb-5">
        <div className="pt-2">
          <div className="text-center">
            <Typography variant="h2" className="font-bold mb-4">Kayıt Ol</Typography>
            <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Kayıt Olmak İçin Email Adresinizi ve Şifrenizi Giriniz</Typography>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
            <div className="mb-1 flex flex-col gap-6">
              <div className="mt-1">
                <Input 
                  name="email" 
                  color="blue" 
                  label="Email"
                  size="lg"
                  placeholder="email@email.com"
                  icon={<i className="fa-solid fa-envelope"/>}
                  required
                  onChange={handleChange}/>
                  {errors.email &&
                    <Typography
                      variant="small"
                      color="gray"
                      className="mt-2 flex items-center gap-1 font-normal">
                      <i className="fa-solid fa-circle-info"></i>
                      {errors.email}
                    </Typography>
                  }
              </div>
              <div className="mt-1">
                <Input
                  name="password"
                  type="password"
                  color="blue" 
                  label="Şifre"
                  size="lg"
                  placeholder="************"
                  icon={<i className="fa-solid fa-lock"></i>}
                  required
                  onChange={handleChange}/>
                  {errors.password &&
                    <Typography
                      variant="small"
                      color="gray"
                      className="mt-2 flex items-center gap-1 font-normal">
                      <i className="fa-solid fa-circle-info"></i>
                      {errors.password}
                    </Typography>
                  }
              </div>
              <div className="mt-1">
                <Input
                  name="repassword"
                  type="password"
                  color="blue" 
                  label="Şifre (Tekrar)"
                  size="lg"
                  placeholder="************"
                  icon={<i className="fa-solid fa-lock"></i>}
                  required
                  onChange={handleChange}/>
                  {errors.repassword &&
                    <Typography
                      variant="small"
                      color="gray"
                      className="mt-2 flex items-center gap-1 font-normal">
                      <i className="fa-solid fa-circle-info"></i>
                      {errors.repassword}
                    </Typography>
                  }
              </div>
            </div>
            <Button type="submit" className="mt-6" fullWidth>
              Kayıt Ol
            </Button>

            <div className="flex items-center justify-between gap-2 mt-2">
              <Typography variant="small" className="font-medium text-gray-900 underline">
                <a href="/auth/signin">Giriş Yap</a>
              </Typography>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default SignUp;
