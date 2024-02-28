import { useState, useEffect, useRef } from 'react';
import Select from "react-select"
import { object, string} from 'yup';
import { useNavigate, useLocation } from "react-router-dom"
import { Checkbox, Input, Button, Typography, Card, CardHeader, CardBody, Popover, PopoverHandler, PopoverContent} from "@material-tailwind/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { baseUrl } from "@/constant";

export function CreateSurvey() {
  
  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef();

  const [formMode, setFormMode] = useState();
  const [formData, setFormData] = useState({organizationId: 0, title: "", startDate: "", endDate: "", isActive: true});
  const [errors, setErrors] = useState({});
  const [organizations, setOrganizations] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    getOrganizations();

    if(location.state != null) {
      setFormMode(1);

      let survey = location.state.survey;
      let [startDay, startMonth, startYear] = survey.startDate.split('.');
      let [endDay, endMonth, endYear] = survey.endDate.split('.');
      const startDate = new Date(+startYear, +startMonth - 1, +startDay);
      const endDate = new Date(+endYear, +endMonth - 1, +endDay);
      setFormData({id:survey.id, organizationId: survey.organizationId, title: survey.title, startDate: startDate, endDate: endDate, isActive: survey.isActive});
    }
    else {
      setFormMode(0);
    }

    inputRef.current.focus();
  }, []);

  const getOrganizations = () => {
    fetch(baseUrl + 'organizations/get', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
    })
    .then((res) => {return res.json()})
    .then((data) => {setOrganizations(data)})
  }; 

  const validationSchema = object({
    title: string()
      .required("Anket Başlığı Girmelisiniz")
      .min(3,"Anket Başlığı Minimum 3 Karakter Olmalıdır")
      .max(150,"Anket Başlığı Maximum 150 Karakter Olmalıdır")
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const createSurvey = () => {    
    let reqData = JSON.stringify(formData,["organizationId","title","startDate","endDate","isActive"]);
    fetch(baseUrl + 'surveys/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
      body: reqData
    })
    .then((res) => { 
      if(res.status == 201) { navigate('/manage/surveymanagement')}
      else {alert("Hata Oluştu")}
    })
    .catch(error => {alert("Hata Oluştu : " + error.inner)});
  };

  const updateSurvey = (id) => {
    let reqData = JSON.stringify(formData,["id","organizationId","title","startDate","endDate","isActive"]);
    console.log(reqData);
    fetch(baseUrl + `surveys/update/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
      body: reqData
    })
    .then((res) => { navigate('/manage/surveymanagement')})
    .catch(error => {alert("Hata Oluştu : " + error.inner)});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    try {
      await validationSchema.validate(formData, {abortEarly: false});
      if(formMode == 0) {createSurvey()}
      else {updateSurvey(location.state.survey.id)}
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
            {formMode == 0 ? "Anket Ekle" : "Anket Düzenle"}
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
            <div className="mb-1 flex flex-col gap-6">
              <div className="mt-1">
              <Select
                ref={inputRef}
                name="organizationId"
                placeholder="Şirket Seçiniz"
                required
                color="blue"
                defaultValue = {location.state && {label:location.state.survey.organizationLabel}}
                onChange={(e) => handleChange({target:{name:"organizationId", value:e.id}})}
                autoFocus
                options={organizations}/> 
              </div>
              <div className="mt-1">
                <Input
                  name="title"
                  color="blue" 
                  label="Anket Adı"
                  size="lg"
                  placeholder="Anket Adı Giriniz"
                  icon={<i className="fa-solid fa-building"/>}
                  defaultValue = {location.state ? location.state.survey.title : ""}
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
                <Popover placement="bottom">
                  <PopoverHandler>
                  <Input
                    name="startDate"
                    label="Başlangıç Tarihi Seçiniz"
                    color="blue" 
                    required
                    onChange={() => null}
                    value={startDate ? format(startDate, "dd.MM.yyyy") : location.state ? location.state.survey.startDate : ""}/>
                </PopoverHandler>
                <PopoverContent>
                  <DayPicker
                    mode="single"
                    selected={startDate}
                    onSelect={(e) => {
                      handleChange({target:{name:"startDate", value:e}});
                      setStartDate(e)
                    }}
                    showOutsideDays
                    className="border-0"
                    classNames={{
                      caption: "flex justify-center py-2 mb-4 relative items-center",
                      caption_label: "text-sm font-medium text-gray-900",
                      nav: "flex items-center",
                      nav_button: "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                      nav_button_previous: "absolute left-1.5",
                      nav_button_next: "absolute right-1.5",
                      table: "w-full border-collapse",
                      head_row: "flex font-medium text-gray-900",
                      head_cell: "m-0.5 w-9 font-normal text-sm",
                      row: "flex w-full mt-2",
                      cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                      day: "h-9 w-9 p-0 font-normal",
                      day_range_end: "day-range-end",
                      day_selected: "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                      day_today: "rounded-md bg-gray-200 text-gray-900",
                      day_outside: "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                      day_disabled: "text-gray-500 opacity-50",
                      day_hidden: "invisible",
                    }}
                    components={{
                      IconLeft: ({ ...props }) => (
                        <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                      ),
                      IconRight: ({ ...props }) => (
                        <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                      )
                    }}/>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="mt-1">
                <Popover placement="bottom">
                  <PopoverHandler>
                  <Input
                    name="endDate"
                    label="Bitiş Tarihi Seçiniz"
                    color="blue"
                    required
                    onChange={() => null}
                    value={endDate ? format(endDate, "dd.MM.yyyy") : location.state ? location.state.survey.endDate : ""}/>
                </PopoverHandler>
                <PopoverContent>
                  <DayPicker
                    mode="single"
                    selected={endDate}
                    onSelect={(e) => {
                      handleChange({target:{name:"endDate", value:e}});
                      setEndDate(e)
                    }}
                    showOutsideDays
                    className="border-0"
                    classNames={{
                      caption: "flex justify-center py-2 mb-4 relative items-center",
                      caption_label: "text-sm font-medium text-gray-900",
                      nav: "flex items-center",
                      nav_button: "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                      nav_button_previous: "absolute left-1.5",
                      nav_button_next: "absolute right-1.5",
                      table: "w-full border-collapse",
                      head_row: "flex font-medium text-gray-900",
                      head_cell: "m-0.5 w-9 font-normal text-sm",
                      row: "flex w-full mt-2",
                      cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                      day: "h-9 w-9 p-0 font-normal",
                      day_range_end: "day-range-end",
                      day_selected: "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                      day_today: "rounded-md bg-gray-200 text-gray-900",
                      day_outside: "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                      day_disabled: "text-gray-500 opacity-50",
                      day_hidden: "invisible",
                    }}
                    components={{
                      IconLeft: ({ ...props }) => (
                        <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                      ),
                      IconRight: ({ ...props }) => (
                        <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                      )
                    }}/>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="mt-1">
                <Checkbox
                  name = "isActive"
                  color="blue" 
                  label= "Aktif"
                  defaultChecked = {location.state ? location.state.survey.isActive : true}
                  onChange={(e) => handleChange({target:{name:"isActive", value:e.target.checked}})}/>
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

export default CreateSurvey;